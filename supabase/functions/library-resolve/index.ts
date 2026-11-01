// Edge function: resolves the content library server-side (no CORS problems, no key leaks) and caches for one hour.
// Deploy: supabase functions deploy library-resolve --no-verify-jwt
// Secrets (optional): CURSEFORGE_API_KEY, GITHUB_TOKEN, SUPABASE_SERVICE_ROLE_KEY (to read the library_entries table)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildLibrary } from "../_shared/library/build.ts";
import type { LibraryEntry, LibraryFile } from "../_shared/library/types.ts";
import bundled from "./library.json" with { type: "json" };

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const TTL_MS = 60 * 60 * 1000;
let cache: { at: number; body: LibraryFile; errors: string[] } | null = null;

/** Optional extra rows from the `library_entries` table (columns: id text primary key, data jsonb). */
async function tableEntries(): Promise<LibraryEntry[]> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/library_entries?select=data`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!res.ok) return [];
    const rows = (await res.json()) as { data: LibraryEntry }[];
    return rows.map((r) => r.data);
  } catch {
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    if (!cache || Date.now() - cache.at > TTL_MS) {
      const base = (bundled as { entries: LibraryEntry[] }).entries;
      const extra = await tableEntries();
      const ids = new Set(extra.map((e) => e.id));
      const { file, errors } = await buildLibrary([...base.filter((e) => !ids.has(e.id)), ...extra]);
      cache = { at: Date.now(), body: file, errors };
    }
    return new Response(JSON.stringify(cache.body), {
      headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
