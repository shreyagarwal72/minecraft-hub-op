/** Shared types for the content library (used by the site, the sync scripts and the edge function). */

export type EntryType = "version" | "launcher" | "modpack" | "shader" | "resourcepack" | "mod" | "world";
export type Provider = "modrinth" | "curseforge" | "github" | "mojang" | "direct" | "gdrive" | "mediafire";

export interface Source {
  provider: Provider;
  url: string;
  label: string;
  /** true once a person or `library:check --write` verified the link works */
  checked: boolean;
  /** ISO date of the last check, or null */
  lastChecked: string | null;
  /**
   * Provider-specific reference used by the adapter:
   * modrinth: project slug | curseforge: numeric project id | github: "owner/repo" | mojang: "release" or "snapshot".
   * Optional: without it the source is treated as a plain link.
   */
  ref?: string;
  /** github only: regular expression that picks the release asset */
  assetPattern?: string;
}

export interface LibraryEntry {
  id: string;
  type: EntryType;
  title: string;
  description: string;
  /** path under /public, e.g. /library/bsl-shader.jpg */
  image: string;
  tags: string[];
  mcVersions: string[];
  loaders: string[];
  license: string;
  author: string;
  /** ISO date the entry was last edited by hand */
  updated: string;
  /** Source order is priority order: the first healthy source is primary, the rest are mirrors. */
  sources: Source[];
  /** Marks an entry whose files are currently gone (shown greyed out, no download button). */
  unavailable?: boolean;
  note?: string;
}

export interface Resolved {
  version: string | null;
  downloadUrl: string;
  size: number | null;
  hash: string | null;
  updated: string | null;
  changelog: string | null;
  /** index in entry.sources that produced this result */
  sourceIndex: number;
  /** false for plain links we cannot verify (Drive, MediaFire, direct) */
  verified: boolean;
  fetchedAt: string;
}

export interface ResolvedEntry extends LibraryEntry {
  resolved: Resolved | null;
}

export interface MojangVersion {
  id: string;
  type: "release" | "snapshot" | "old_beta" | "old_alpha";
  releaseTime: string;
  /** per-version JSON from the manifest */
  url: string;
}

export interface MojangInfo {
  latestRelease: MojangVersion;
  latestSnapshot: MojangVersion;
  /** every release, newest first */
  releases: MojangVersion[];
}

export interface LibraryFile {
  /** ISO timestamp the file was generated; the epoch means "never synced" */
  generatedAt: string;
  mojang: MojangInfo | null;
  entries: ResolvedEntry[];
}

/** Every adapter implements this. It must throw on failure so the next source can be tried. */
export interface ProviderAdapter {
  resolve(entry: LibraryEntry, source: Source, sourceIndex: number): Promise<Resolved>;
}

export const USER_AGENT = "minecraft-java-hub/1.0 (https://java-minecraft.vercel.app; library sync)";
