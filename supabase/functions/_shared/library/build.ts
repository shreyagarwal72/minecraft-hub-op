import type { LibraryEntry, LibraryFile } from "./types.ts";
import { fetchMojang } from "./providers/mojang.ts";
import { resolveEntry } from "./providers/index.ts";

/** Resolve every entry against its providers. Used by `library:sync` and the `library-resolve` edge function. */
export async function buildLibrary(entries: LibraryEntry[]): Promise<{ file: LibraryFile; errors: string[] }> {
  const errors: string[] = [];
  let mojang = null;
  try {
    mojang = await fetchMojang();
  } catch (e) {
    errors.push(`mojang manifest: ${(e as Error).message}`);
  }
  const out = await Promise.all(
    entries.map(async (entry) => {
      const { resolved, errors: errs } = await resolveEntry(entry);
      errors.push(...errs);
      return { ...entry, resolved };
    }),
  );
  return { file: { generatedAt: new Date().toISOString(), mojang, entries: out }, errors };
}
