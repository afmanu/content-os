const EPSILON = 1e-6;

export function round(value, digits = 6) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function finite(value, label) {
  if (!Number.isFinite(value)) throw new Error(`${label} must be finite`);
}

export function validateCuts(cuts, duration, words = []) {
  finite(duration, "duration");
  if (duration <= 0) throw new Error("duration must be positive");
  if (!Array.isArray(cuts)) throw new Error("cuts must be an array");

  const validated = cuts.map((cut, index) => {
    if (!cut || typeof cut !== "object") throw new Error(`cut ${index} must be an object`);
    finite(cut.start, `cut ${index}.start`);
    finite(cut.end, `cut ${index}.end`);
    if (cut.start < -EPSILON || cut.end > duration + EPSILON) {
      throw new Error(`cut ${index} is outside 0..${duration}`);
    }
    if (cut.end - cut.start <= EPSILON) throw new Error(`cut ${index} must have start < end`);
    return { ...cut, start: round(cut.start), end: round(cut.end) };
  });

  for (let index = 1; index < validated.length; index++) {
    const previous = validated[index - 1];
    const current = validated[index];
    if (current.start + EPSILON < previous.start) {
      throw new Error("cuts must already be ordered; implicit sorting is not allowed");
    }
    if (current.start < previous.end - EPSILON) {
      throw new Error("cuts must not overlap; implicit merging is not allowed");
    }
  }

  for (const [cutIndex, cut] of validated.entries()) {
    for (const [wordIndex, word] of words.entries()) {
      finite(Number(word.start), `word ${wordIndex}.start`);
      finite(Number(word.end), `word ${wordIndex}.end`);
      const overlaps = cut.start < Number(word.end) - EPSILON && Number(word.start) < cut.end - EPSILON;
      const contains = cut.start <= Number(word.start) + EPSILON && cut.end >= Number(word.end) - EPSILON;
      if (overlaps && !contains) {
        throw new Error(`cut ${cutIndex} partially intersects word ${word.id ?? word.text ?? wordIndex}`);
      }
    }
  }

  return validated;
}

export function buildKeepRanges(duration, cuts) {
  const valid = validateCuts(cuts, duration);
  const keep = [];
  let cursor = 0;
  for (const cut of valid) {
    if (cut.start > cursor + EPSILON) keep.push({ start: round(cursor), end: round(cut.start) });
    cursor = cut.end;
  }
  if (cursor < duration - EPSILON) keep.push({ start: round(cursor), end: round(duration) });
  return keep;
}

export function mapFromKeepRanges(keepRanges, sourceDuration, editedDuration, label) {
  if (!Array.isArray(keepRanges) || keepRanges.length === 0) {
    throw new Error(`${label}.keep_ranges must contain at least one range`);
  }
  let sourceCursor = -Infinity;
  let outputCursor = 0;
  const segments = keepRanges.map((range, index) => {
    const start = Number(range.start);
    const end = Number(range.end);
    finite(start, `${label}.keep_ranges[${index}].start`);
    finite(end, `${label}.keep_ranges[${index}].end`);
    if (start < -EPSILON || end > sourceDuration + EPSILON || end <= start + EPSILON) {
      throw new Error(`${label}.keep_ranges[${index}] is invalid`);
    }
    if (start < sourceCursor - EPSILON) throw new Error(`${label}.keep_ranges are not ordered and disjoint`);
    const length = end - start;
    const segment = {
      keep_index: index,
      input: { start: round(start), end: round(end) },
      output: { start: round(outputCursor), end: round(outputCursor + length) },
    };
    sourceCursor = end;
    outputCursor += length;
    return segment;
  });
  if (Math.abs(outputCursor - editedDuration) > 0.002) {
    throw new Error(`${label} keep ranges sum to ${round(outputCursor)}, not ${editedDuration}`);
  }
  return segments;
}

export function composeEdls(pass1, pass2) {
  const originalDuration = Number(pass1.source_duration);
  const intermediateDuration = Number(pass1.edited_duration);
  const pass2InputDuration = Number(pass2.source_duration);
  const finalDuration = Number(pass2.edited_duration);
  [originalDuration, intermediateDuration, pass2InputDuration, finalDuration].forEach((value, index) => finite(value, `duration ${index}`));
  if (Math.abs(intermediateDuration - pass2InputDuration) > 0.002) {
    throw new Error("pass 2 input duration does not match pass 1 output duration");
  }

  const firstMap = mapFromKeepRanges(pass1.keep_ranges, originalDuration, intermediateDuration, "pass1");
  const secondMap = mapFromKeepRanges(pass2.keep_ranges, pass2InputDuration, finalDuration, "pass2");
  const segments = [];

  for (const second of secondMap) {
    for (const first of firstMap) {
      const intersectionStart = Math.max(second.input.start, first.output.start);
      const intersectionEnd = Math.min(second.input.end, first.output.end);
      if (intersectionEnd <= intersectionStart + EPSILON) continue;
      const originalStart = first.input.start + (intersectionStart - first.output.start);
      const originalEnd = originalStart + (intersectionEnd - intersectionStart);
      const finalStart = second.output.start + (intersectionStart - second.input.start);
      const finalEnd = finalStart + (intersectionEnd - intersectionStart);
      segments.push({
        id: `segment-${String(segments.length + 1).padStart(3, "0")}`,
        pass1_keep_index: first.keep_index,
        pass2_keep_index: second.keep_index,
        final: { start: round(finalStart), end: round(finalEnd) },
        intermediate: { start: round(intersectionStart), end: round(intersectionEnd) },
        original: { start: round(originalStart), end: round(originalEnd) },
      });
    }
  }

  const total = segments.reduce((sum, segment) => sum + segment.final.end - segment.final.start, 0);
  if (Math.abs(total - finalDuration) > 0.002) {
    throw new Error(`composed segments sum to ${round(total)}, not ${finalDuration}`);
  }
  for (let index = 1; index < segments.length; index++) {
    if (Math.abs(segments[index - 1].final.end - segments[index].final.start) > 0.002) {
      throw new Error("composed final timeline has a gap or overlap");
    }
  }

  return {
    durations: {
      original: round(originalDuration),
      intermediate: round(intermediateDuration),
      final: round(finalDuration),
    },
    firstMap,
    secondMap,
    segments,
  };
}

export function retimeOriginalWords(words, segments) {
  const output = [];
  for (const word of words) {
    const originalStart = Number(word.start);
    const originalEnd = Number(word.end);
    const segment = segments.find(
      (item) => originalStart >= item.original.start - EPSILON && originalEnd <= item.original.end + EPSILON,
    );
    if (!segment) {
      const intersects = segments.some(
        (item) => originalStart < item.original.end - EPSILON && item.original.start < originalEnd - EPSILON,
      );
      if (intersects) throw new Error(`word ${word.id ?? word.text} crosses a composed cut boundary`);
      continue;
    }
    const offset = originalStart - segment.original.start;
    const length = originalEnd - originalStart;
    const intermediateStart = segment.intermediate.start + offset;
    const finalStart = segment.final.start + offset;
    output.push({
      id: word.id,
      type: "word",
      text: word.text,
      start: round(finalStart),
      end: round(finalStart + length),
      marker: word.marker,
      lineage: {
        segment_id: segment.id,
        original: { start: round(originalStart), end: round(originalEnd) },
        intermediate: { start: round(intermediateStart), end: round(intermediateStart + length) },
        final: { start: round(finalStart), end: round(finalStart + length) },
      },
    });
  }
  return output;
}

export function assertTranscriptEquivalent(derivedWords, upstreamWords, tolerance = 0.002) {
  if (derivedWords.length !== upstreamWords.length) {
    throw new Error(`derived transcript has ${derivedWords.length} words; upstream has ${upstreamWords.length}`);
  }
  for (let index = 0; index < derivedWords.length; index++) {
    const derived = derivedWords[index];
    const upstream = upstreamWords[index];
    if (derived.text !== upstream.text) throw new Error(`word ${index} text differs`);
    if (Math.abs(derived.start - Number(upstream.start)) > tolerance || Math.abs(derived.end - Number(upstream.end)) > tolerance) {
      throw new Error(`word ${index} timing differs from upstream output`);
    }
  }
}
