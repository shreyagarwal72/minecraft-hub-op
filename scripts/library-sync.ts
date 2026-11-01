/** npm run library:sync - resolves content/library.json and writes src/data/library.generated.json. */
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { buildLibrary } from "../supabase/functions/_shared/library/build.ts";
import type { LibraryEntry, LibraryFile } from "../supabase/functions/_shared/library/types.ts";

const OUT = "src/data/library.generated.json";
const entries = (JSON.parse(readFileSync("content/library.json", "utf8")) as { entries: LibraryEntry[] }).entries;
copyFileSync("content/library.json", "supabase/functions/library-resolve/library.json");

const { file, errors } = await buildLibrary(entries);
errors.forEach((e) => console.warn("warn:", e));

let previous: LibraryFile | null = null;
try { previous = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* first run */ }

// If a provider failed this time, keep the last good resolved data instead of wiping it.
if (previous) {
  const old = new Map(previous.entries.map((e) => [e.id, e.resolved]));
  file.entries.forEach((e) => { if (!e.resolved && old.get(e.id)) e.resolved = old.get(e.id) ?? null; });
  if (!file.mojang) file.mojang = previous.mojang;
}

const resolvedCount = file.entries.filter((e) => e.resolved).length;
const verifiedCount = file.entries.filter((e) => e.resolved?.verified).length;
if (!file.mojang && verifiedCount === 0) {
  console.error("No provider answered (offline or blocked?). Keeping the existing generated file.");
  process.exit(1);
}
writeFileSync(OUT, JSON.stringify(file, null, 2) + "\n");
console.log(`Wrote ${OUT}: ${resolvedCount}/${file.entries.length} entries resolved, mojang ${file.mojang ? file.mojang.latestRelease.id : "missing"}.`);
