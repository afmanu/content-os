// SYNTHETIC / FICTIONAL TESTS ONLY
import test from "node:test";
import assert from "node:assert/strict";
import { buildKeepRanges, composeEdls, retimeOriginalWords, validateCuts } from "../adapters/timeline.mjs";
import { normalizeFasterWhisperTranscript } from "../adapters/normalize-transcript.mjs";

const words = [
  { id: "a", text: "alpha", start: 1, end: 1.4 },
  { id: "b1", text: "beta", start: 1.7, end: 2.1 },
  { id: "b2", text: "beta", start: 2.25, end: 2.65 },
];

test("empty cut list is an explicit identity", () => {
  assert.deepEqual(validateCuts([], 3, words), []);
  assert.deepEqual(buildKeepRanges(3, []), [{ start: 0, end: 3 }]);
});

test("out-of-range cuts are rejected", () => {
  assert.throws(() => validateCuts([{ start: -0.01, end: 0.2 }], 3, words), /outside/);
  assert.throws(() => validateCuts([{ start: 2.8, end: 3.01 }], 3, words), /outside/);
});

test("problematic temporal boundaries are rejected, not corrected", () => {
  assert.throws(() => validateCuts([{ start: 1.2, end: 1.5 }], 3, words), /partially intersects/);
  assert.throws(
    () => validateCuts([{ start: 1.7, end: 2.25 }, { start: 2.2, end: 2.7 }], 3, words),
    /overlap/,
  );
  assert.throws(
    () => validateCuts([{ start: 2.25, end: 2.65 }, { start: 1.7, end: 2.1 }], 3, words),
    /ordered/,
  );
});

test("two passes retain a concrete final to intermediate to original mapping", () => {
  const pass1 = {
    source_duration: 12,
    edited_duration: 5.09,
    keep_ranges: [
      { start: 0.78, end: 2.782 },
      { start: 4.892, end: 6.332 },
      { start: 8.892, end: 10.54 },
    ],
  };
  const pass2 = {
    source_duration: 5.09,
    edited_duration: 4.54,
    keep_ranges: [
      { start: 0, end: 0.92 },
      { start: 1.47, end: 5.09 },
    ],
  };
  const composed = composeEdls(pass1, pass2);
  assert.deepEqual(composed.segments[1], {
    id: "segment-002",
    pass1_keep_index: 0,
    pass2_keep_index: 1,
    final: { start: 0.92, end: 1.452 },
    intermediate: { start: 1.47, end: 2.002 },
    original: { start: 2.25, end: 2.782 },
  });
  const retimed = retimeOriginalWords(words, composed.segments);
  assert.deepEqual(retimed.map((word) => word.id), ["a", "b2"]);
  assert.deepEqual(retimed[1].lineage, {
    segment_id: "segment-002",
    original: { start: 2.25, end: 2.65 },
    intermediate: { start: 1.47, end: 1.87 },
    final: { start: 0.92, end: 1.32 },
  });
});

test("local faster-whisper output is normalized without changing word times", () => {
  const normalized = normalizeFasterWhisperTranscript(
    {
      schema_version: "1.0.0",
      analysis_audio_sha256: "a".repeat(64),
      model: "large-v3-turbo",
      language: "es",
      canonical: {
        words: [
          { id: "word_00000", text: " Una", start_ms: 120, end_ms: 360, probability: 0.98, support: "both" },
          { id: "word_00001", text: " prueba", start_ms: 400, end_ms: 760, probability: 0.97, support: "both" },
        ],
      },
    },
    {
      asset_id: "fixture-real-source",
      path: "fixtures/fictional-source.mov",
      sha256: "b".repeat(64),
      duration_seconds: 2,
    },
  );

  assert.equal(normalized.synthetic, false);
  assert.equal(normalized.transcription_method, "faster_whisper_local");
  assert.equal(normalized.language_code, "es");
  assert.deepEqual(normalized.words.map(({ text, start, end }) => ({ text, start, end })), [
    { text: "Una", start: 0.12, end: 0.36 },
    { text: "prueba", start: 0.4, end: 0.76 },
  ]);
});

test("local faster-whisper normalization rejects overlapping timings", () => {
  assert.throws(
    () => normalizeFasterWhisperTranscript(
      {
        schema_version: "1.0.0",
        analysis_audio_sha256: "a".repeat(64),
        model: "large-v3-turbo",
        language: "es",
        canonical: {
          words: [
            { id: "word_00000", text: "uno", start_ms: 100, end_ms: 500 },
            { id: "word_00001", text: "dos", start_ms: 450, end_ms: 700 },
          ],
        },
      },
      { asset_id: "fixture", path: "fixtures/fictional-source.mov", sha256: "b".repeat(64), duration_seconds: 2 },
    ),
    /overlaps/,
  );
});
