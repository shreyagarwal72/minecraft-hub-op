import { getJson } from "../http.ts";
import type { MojangInfo, MojangVersion, ProviderAdapter } from "../types.ts";

export const MOJANG_MANIFEST = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

interface Manifest {
  latest: { release: string; snapshot: string };
  versions: MojangVersion[];
}

export async function fetchMojang(): Promise<MojangInfo> {
  const m = await getJson<Manifest>(MOJANG_MANIFEST);
  const byId = new Map(m.versions.map((v) => [v.id, v]));
  const latestRelease = byId.get(m.latest.release);
  const latestSnapshot = byId.get(m.latest.snapshot);
  if (!latestRelease || !latestSnapshot) throw new Error("Mojang manifest is missing its latest entries");
  return { latestRelease, latestSnapshot, releases: m.versions.filter((v) => v.type === "release") };
}

/** ref "release" or "snapshot" picks which latest version this entry follows. */
export const mojang: ProviderAdapter = {
  async resolve(_entry, source, sourceIndex) {
    const info = await fetchMojang();
    const v = source.ref === "snapshot" ? info.latestSnapshot : info.latestRelease;
    return {
      version: v.id,
      downloadUrl: source.url,
      size: null,
      hash: null,
      updated: v.releaseTime,
      changelog: null,
      sourceIndex,
      verified: true,
      fetchedAt: new Date().toISOString(),
    };
  },
};
