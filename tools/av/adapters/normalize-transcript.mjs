#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { round } from "./timeline.mjs";

function normalizeSyntheticTranscript(input, source) {
  const duration = Number(input.audio_duration_secs);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error("audio_duration_secs must be positive");
  if (!Array.isArray(input.words) || input.words.length === 0) throw new Error("words must be a non-empty array");

  const ids = new Set();
  let previousEnd = 0;
  const words = input.words.map((word, index) => {
    const id = String(word.id ?? "");
    const text = String(word.text ?? "").trim();
    const start = Number(word.start);
    const end = Number(word.end);
    if (!id || ids.has(id)) throw new Error(`word ${index} needs a unique id`);
    if (!text) throw new Error(`word ${index} needs text`);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start || end > duration) {
      throw new Error(`word ${id} has invalid timing`);
    }
    if (start < previousEnd) throw new Error(`word ${id} overlaps or is out of order`);
    if (!word.marker || !Number.isFinite(Number(word.marker.frequency_hz)) || !/^#[0-9a-f]{6}$/i.test(word.marker.color ?? "")) {
      throw new Error(`word ${id} needs a synthetic frequency and hex color marker`);
    }
    ids.add(id);
    previousEnd = end;
    return {
      id,
      type: "word",
      text,
      start: round(start),
      end: round(end),
      source_start: round(start),
      source_end: round(end),
      marker: { frequency_hz: Number(word.marker.frequency_hz), color: word.marker.color.toUpperCase() },
    };
  });

  return {
    schema_version: "content-os.av.transcript.v1",
    synthetic: true,
    transcription_method: "fixture_known_timestamps_no_asr",
    language_code: input.language_code ?? "zxx",
    source: {
      asset_id: source.asset_id,
      path: source.path,
      sha256: source.sha256,
      duration_seconds: round(duration),
    },
    audio_duration_secs: round(duration),
    words,
  };
}

export function normalizeFasterWhisperTranscript(input, source) {
  if (!input || input.schema_version !== "1.0.0" || !input.canonical || !Array.isArray(input.canonical.words)) {
    throw new Error("faster-whisper transcript does not match the supported local engine schema");
  }
  if (!input.model || !input.language || !/^[0-9a-f]{64}$/i.test(input.analysis_audio_sha256 ?? "")) {
    throw new Error("faster-whisper transcript needs model, language and analysis audio hash");
  }
  const duration = Number(source.duration_seconds);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error("real source duration_seconds must be positive");
  if (input.canonical.words.length === 0) throw new Error("canonical words must be non-empty");

  const ids = new Set();
  let previousEnd = 0;
  const words = input.canonical.words.map((word, index) => {
    const id = String(word.id ?? "");
    const text = String(word.text ?? "").trim();
    const start = Number(word.start_ms) / 1000;
    const end = Number(word.end_ms) / 1000;
    if (!id || ids.has(id)) throw new Error(`word ${index} needs a unique id`);
    if (!text) throw new Error(`word ${index} needs text`);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start || end > duration) {
      throw new Error(`word ${id} has invalid timing`);
    }
    if (start < previousEnd) throw new Error(`word ${id} overlaps or is out of order`);
    ids.add(id);
    previousEnd = end;
    return {
      id,
      type: "word",
      text,
      start: round(start),
      end: round(end),
      source_start: round(start),
      source_end: round(end),
      confidence: Number.isFinite(Number(word.probability)) ? Number(word.probability) : null,
      support: word.support ?? null,
    };
  });

  return {
    schema_version: "content-os.av.transcript.v1",
    synthetic: false,
    transcription_method: "faster_whisper_local",
    language_code: input.language,
    model: input.model,
    source: {
      asset_id: source.asset_id,
      path: source.path,
      sha256: source.sha256,
      duration_seconds: round(duration),
      analysis_audio_sha256: input.analysis_audio_sha256.toLowerCase(),
    },
    audio_duration_secs: round(duration),
    words,
  };
}

export function normalizeTranscript(input, source) {
  if (input?.synthetic === true) return normalizeSyntheticTranscript(input, source);
  return normalizeFasterWhisperTranscript(input, source);
}

function main() {
  const [inputPath, outputPath, sourcePath, sourceHash, sourceDuration] = process.argv.slice(2);
  if (!inputPath || !outputPath || !sourcePath || !sourceHash) {
    throw new Error("Usage: normalize-transcript.mjs <input> <output> <source-path> <source-sha256>");
  }
  const input = JSON.parse(readFileSync(resolve(inputPath), "utf8"));
  const normalized = normalizeTranscript(input, {
    asset_id: input.synthetic === true ? "synthetic-v1-original" : "real-source-original",
    path: sourcePath.replace(/\\/g, "/"),
    sha256: sourceHash.toLowerCase(),
    duration_seconds: sourceDuration,
  });
  writeFileSync(resolve(outputPath), `${JSON.stringify(normalized, null, 2)}\n`);
  console.log(JSON.stringify({ output: resolve(outputPath), words: normalized.words.length, duration: normalized.audio_duration_secs }));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
