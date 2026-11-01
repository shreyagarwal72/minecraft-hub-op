import { getJson } from "../http.ts";
import type { ProviderAdapter } from "../types.ts";

interface MrFile { url: string; size: number; primary: boolean; hashes: { sha512?: string; sha1?: string } }
interface MrVersion { version_number: string; date_published: string; changelog: string | null; files: MrFile[] }
interface MrProject { icon_url?: string; gallery?: { url: string }[] }

/** ref = project slug. Uses the v2 API: GET /project/{slug}/version (newest first). */
export const modrinth: ProviderAdapter = {
  async resolve(entry, source, sourceIndex) {
    if (!source.ref) throw new Error("modrinth source has no ref (project slug)");
    const params = new URLSearchParams();
    if (entry.loaders.length) params.set("loaders", JSON.stringify(entry.loaders.map((l) => l.toLowerCase())));
    const q = params.toString() ? `?${params}` : "";
    
    const [versions, project] = await Promise.all([
      getJson<MrVersion[]>(`https://api.modrinth.com/v2/project/${encodeURIComponent(source.ref)}/version${q}`).catch(async () => {
        return getJson<MrVersion[]>(`https://api.modrinth.com/v2/project/${encodeURIComponent(source.ref)}/version`);
      }),
      getJson<MrProject>(`https://api.modrinth.com/v2/project/${encodeURIComponent(source.ref)}`).catch(() => null),
    ]);

    const v = versions[0];
    if (!v) throw new Error(`no versions for ${source.ref}`);
    const file = v.files.find((f) => f.primary) ?? v.files[0];
    if (!file) throw new Error(`no files in ${source.ref} ${v.version_number}`);

    const iconUrl = project?.icon_url ?? null;
    const galleryUrl = project?.gallery?.[0]?.url ?? null;

    return {
      version: v.version_number,
      downloadUrl: file.url,
      size: file.size ?? null,
      hash: file.hashes.sha512 ? `sha512:${file.hashes.sha512}` : file.hashes.sha1 ? `sha1:${file.hashes.sha1}` : null,
      updated: v.date_published,
      changelog: v.changelog,
      sourceIndex,
      verified: true,
      fetchedAt: new Date().toISOString(),
      iconUrl,
      galleryUrl,
    };
  },
};
