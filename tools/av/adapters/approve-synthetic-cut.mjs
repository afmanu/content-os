#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCuts } from "./timeline.mjs";

export function approveSyntheticCut(candidatesDoc, transcript, expectation) {
  const matches = (candidatesDoc.candidates ?? []).filter(
    (candidate) => candidate.type === "stutter"
      && candidate.confidence === "high"
      && candidate.recommend === "cut"
      && candidate.removes === expectation.repeat.token
      && candidate.keeps === expectation.repeat.token,
  );
  if (matches.length !== 1) throw new Error(`expected exactly one approved synthetic repeat candidate; found ${matches.length}`);
  const candidate = matches[0];
  const cuts = validateCuts(
    [{ ...candidate.cut, reason: `approved synthetic repeat ${candidate.id}: keep second ${expectation.repeat.token}` }],
    Number(transcript.audio_duration_secs),
    transcript.words,
  );
  return {
    schema_version: "content-os.av.approved-cuts.v1",
    synthetic: true,
    review_gate: "predeclared_fixture_expectation",
    candidate_id: candidate.id,
    decision: "approve",
    cuts,
  };
}

function main() {
  const [candidatesPath, transcriptPath, expectationPath, outputPath] = process.argv.slice(2);
  if (!outputPath) throw new Error("Usage: approve-synthetic-cut.mjs <candidates> <transcript> <expectation> <output>");
  const approved = approveSyntheticCut(
    JSON.parse(readFileSync(resolve(candidatesPath), "utf8")),
    JSON.parse(readFileSync(resolve(transcriptPath), "utf8")),
    JSON.parse(readFileSync(resolve(expectationPath), "utf8")),
  );
  writeFileSync(resolve(outputPath), `${JSON.stringify(approved, null, 2)}\n`);
  console.log(JSON.stringify({ output: resolve(outputPath), cuts: approved.cuts.length, candidate: approved.candidate_id }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
