import { getJson } from "../http.ts";
import type { ProviderAdapter } from "../types.ts";

declare const Deno: { env: { get(k: string): string | undefined } } | undefined;
const key = (): string | undefined =>
  typeof Deno !== "undefined" ? Deno.env.get("CURSEFORGE_API_KEY") : (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.CURSEFORGE_API_KEY;

interface CfFile { displayName: string; fileDate: string; fileLength: number; downloadUrl: string | null; hashes: { value: string; algo: number }[] }

/** ref = numeric project id. Needs CURSEFORGE_API_KEY (server-side only, never shipped to the browser). */
export const curseforge: ProviderAdapter = {
  async resolve(_entry, source, sourceIndex) {
    const k = key();
    if (!k) throw new Error("CURSEFORGE_API_KEY is not set");
    if (!source.ref) throw new Error("curseforge source has no ref (project id)");
    const res = await getJson<{ data: CfFile[] }>(`https://api.curseforge.com/v1/mods/${source.ref}/files?pageSize=1`, { "x-api-key": k });
    const f = res.data[0];
    if (!f) throw new Error(`no files for curseforge project ${source.ref}`);
    return {
      version: f.displayName,
      // CurseForge may hide direct links; fall back to the project page then.
      downloadUrl: f.downloadUrl ?? source.url,
      size: f.fileLength ?? null,
      hash: f.hashes[0] ? `${f.hashes[0].algo === 1 ? "sha1" : "md5"}:${f.hashes[0].value}` : null,
      updated: f.fileDate,
      changelog: null,
      sourceIndex,
      verified: true,
      fetchedAt: new Date().toISOString(),
    };
  },
};
