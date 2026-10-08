#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertTranscriptEquivalent, composeEdls, retimeOriginalWords } from "./timeline.mjs";

export function createComposedEdl(sourceTranscript, pass1, pass2, upstreamFinal, references) {
  const composed = composeEdls(pass1, pass2);
  const words = retimeOriginalWords(sourceTranscript.words, composed.segments);
  assertTranscriptEquivalent(words, upstreamFinal.words);
  return {
    schema_version: "content-os.av.composed-edl.v1",
    synthetic: true,
    source: sourceTranscript.source,
    timelines: composed.durations,
    passes: [
      {
        id: "pass-1-silence",
        implementation: "hyperframes-student-kit/cut-silences.mjs",
        input_timeline: "original",
        output_timeline: "intermediate",
        params: pass1.params,
        delete_ranges: pass1.delete_ranges,
        keep_ranges: pass1.keep_ranges,
        transcript: references.pass1Transcript,
        decisions: references.pass1Decisions,
        edl: references.pass1Edl,
      },
      {
        id: "pass-2-approved-repeat",
        implementation: "hyperframes-student-kit/apply-cuts.mjs",
        input_timeline: "intermediate",
        output_timeline: "final",
        delete_ranges: pass2.delete_ranges,
        keep_ranges: pass2.keep_ranges,
        transcript: references.pass2Transcript,
        decisions: references.pass2Decisions,
        approved_cuts: references.approvedCuts,
        edl: references.pass2Edl,
      },
    ],
    segments: composed.segments,
    final_transcript: {
      language_code: sourceTranscript.language_code,
      audio_duration_secs: composed.durations.final,
      transcription_method: sourceTranscript.transcription_method,
      words,
    },
    checks: {
      upstream_final_transcript_equivalent: true,
      all_retained_words_reference_original: words.every((word) => Boolean(word.lineage?.original)),
      segment_duration_sum_matches_final: true,
    },
  };
}

function main() {
  const [sourcePath, pass1Path, pass2Path, finalTranscriptPath, refsPath, outputPath] = process.argv.slice(2);
  if (!outputPath) throw new Error("Usage: compose-edl.mjs <source-transcript> <pass1-edl> <pass2-edl> <pass2-transcript> <references-json> <output>");
  const read = (path) => JSON.parse(readFileSync(resolve(path), "utf8"));
  const output = createComposedEdl(read(sourcePath), read(pass1Path), read(pass2Path), read(finalTranscriptPath), read(refsPath));
  writeFileSync(resolve(outputPath), `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify({ output: resolve(outputPath), segments: output.segments.length, words: output.final_transcript.words.length }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
