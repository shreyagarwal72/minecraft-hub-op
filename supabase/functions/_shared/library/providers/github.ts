import { getJson } from "../http.ts";
import type { ProviderAdapter } from "../types.ts";

interface GhAsset { name: string; size: number; browser_download_url: string; digest?: string | null }
interface GhRelease { tag_name: string; name: string | null; published_at: string; body: string | null; html_url: string; assets: GhAsset[] }

declare const Deno: { env: { get(k: string): string | undefined } } | undefined;
const env = (k: string): string | undefined =>
  typeof Deno !== "undefined" ? Deno.env.get(k) : (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env[k];

/** ref = "owner/repo". Uses GET /repos/{owner}/{repo}/releases/latest. GITHUB_TOKEN is optional (rate limits). */
export const github: ProviderAdapter = {
  async resolve(_entry, source, sourceIndex) {
    if (!source.ref) throw new Error("github source has no ref (owner/repo)");
    const token = env("GITHUB_TOKEN");
    const r = await getJson<GhRelease>(`https://api.github.com/repos/${source.ref}/releases/latest`, {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
    const re = source.assetPattern ? new RegExp(source.assetPattern, "i") : null;
    const asset = re ? r.assets.find((a) => re.test(a.name)) : undefined;
    return {
      version: r.tag_name,
      downloadUrl: asset?.browser_download_url ?? r.html_url,
      size: asset?.size ?? null,
      hash: asset?.digest ?? null,
      updated: r.published_at,
      changelog: r.body,
      sourceIndex,
      verified: true,
      fetchedAt: new Date().toISOString(),
    };
  },
};
