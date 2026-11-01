import bundledRaw from "@/data/library.generated.json";
import type { LibraryFile, ResolvedEntry, EntryType, Source } from "@shared/library/types.ts";

export type { LibraryFile, ResolvedEntry, EntryType, Source };

export const BUNDLED: LibraryFile = bundledRaw as unknown as LibraryFile;

/** Accept remote data only if it has the right shape. */
export function isValidLibrary(x: unknown): x is LibraryFile {
  if (!x || typeof x !== "object") return false;
  const f = x as LibraryFile;
  if (typeof f.generatedAt !== "string" || Number.isNaN(Date.parse(f.generatedAt))) return false;
  if (!Array.isArray(f.entries) || f.entries.length === 0) return false;
  return f.entries.every(
    (e) =>
      e && typeof e.id === "string" && typeof e.title === "string" && typeof e.type === "string" &&
      Array.isArray(e.sources) && e.sources.length > 0 && e.sources.every((s) => s && typeof s.url === "string" && /^https:\/\//.test(s.url)),
  );
}

/** Remote data wins only if valid and not older than what we already have. */
export function acceptRemote(current: LibraryFile, remote: unknown): remote is LibraryFile {
  return isValidLibrary(remote) && Date.parse(remote.generatedAt) >= Date.parse(current.generatedAt);
}

/** Signature of everything a visitor would call "a new version". */
export function versionSignature(f: LibraryFile): Record<string, string> {
  const out: Record<string, string> = {};
  if (f.mojang) {
    out["mojang:release"] = f.mojang.latestRelease.id;
    out["mojang:snapshot"] = f.mojang.latestSnapshot.id;
  }
  f.entries.forEach((e) => { if (e.resolved?.version && e.resolved.verified) out[e.id] = e.resolved.version; });
  return out;
}

/** The first source is primary; the other sources are mirrors. */
export function primarySource(e: ResolvedEntry): { source: Source; url: string; mirrors: Source[] } {
  const i = e.resolved?.sourceIndex ?? 0;
  const source = e.sources[i] ?? e.sources[0];
  return { source, url: e.resolved?.downloadUrl ?? source.url, mirrors: e.sources.filter((s) => s !== source) };
}

export const UNVERIFIED_PROVIDERS = new Set(["direct", "gdrive", "mediafire"]);
export const isUnverified = (s: Source) => UNVERIFIED_PROVIDERS.has(s.provider);

export function formatSize(bytes: number | null | undefined): string | null {
  if (!bytes) return null;
  const u = ["B", "KB", "MB", "GB"];
  let i = 0, n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n >= 100 || i === 0 ? 0 : 1)} ${u[i]}`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "never";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "never" : d.toISOString().slice(0, 10);
}

export const TYPE_LABEL: Record<EntryType, string> = {
  version: "Version", launcher: "Launcher", modpack: "Modpack", shader: "Shader", resourcepack: "Resource pack", mod: "Mod", world: "World",
};
