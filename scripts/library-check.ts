/** npm run library:check [-- --write] - checks every source URL. Exits 1 on any dead, expired or unreachable link. */
import { readFileSync, writeFileSync } from "node:fs";
import type { LibraryEntry } from "../supabase/functions/_shared/library/types.ts";
import { USER_AGENT } from "../supabase/functions/_shared/library/types.ts";

const write = process.argv.includes("--write");
const file = JSON.parse(readFileSync("content/library.json", "utf8")) as { entries: LibraryEntry[] };

/** Discord CDN links carry `ex=<hex unix expiry>`. */
function tokenExpiry(url: string): number | null {
  try {
    const ex = new URL(url).searchParams.get("ex");
    return ex && /^[0-9a-f]+$/i.test(ex) ? parseInt(ex, 16) * 1000 : null;
  } catch { return null; }
}

async function probe(url: string): Promise<{ status: number | null; error?: string }> {
  const opts = { redirect: "follow" as const, headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(20000) };
  try {
    let res = await fetch(url, { ...opts, method: "HEAD" });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, { ...opts, method: "GET", headers: { ...opts.headers, Range: "bytes=0-0" } });
    }
    return { status: res.status };
  } catch (e) {
    return { status: null, error: (e as Error).message };
  }
}

let bad = 0;
const today = new Date().toISOString().slice(0, 10);
for (const entry of file.entries) {
  for (const s of entry.sources) {
    const exp = tokenExpiry(s.url);
    const warnings: string[] = [];
    if (exp !== null) warnings.push(exp < Date.now() ? "EXPIRED token" : `token expires ${new Date(exp).toISOString()}`);
    const { status, error } = await probe(s.url);
    const ok = status !== null && status < 400 && !(exp !== null && exp < Date.now());
    if (!ok) bad++;
    console.log(`${ok ? "OK  " : "FAIL"} ${entry.id} [${s.provider}] ${status ?? error} ${warnings.join(", ")}`);
    if (write && ok) { s.checked = true; s.lastChecked = today; }
    if (write && !ok) { s.checked = false; s.lastChecked = today; }
  }
}
if (write) writeFileSync("content/library.json", JSON.stringify(file, null, 2) + "\n");
console.log(bad ? `\n${bad} source(s) failed.` : "\nAll sources OK.");
process.exit(bad ? 1 : 0);
