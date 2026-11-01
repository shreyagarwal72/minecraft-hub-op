import type { LibraryEntry, ProviderAdapter, Provider, Resolved } from "../types.ts";
import { mojang } from "./mojang.ts";
import { modrinth } from "./modrinth.ts";
import { github } from "./github.ts";
import { curseforge } from "./curseforge.ts";
import { direct } from "./direct.ts";

const ADAPTERS: Record<Provider, ProviderAdapter> = {
  mojang, modrinth, github, curseforge, direct, gdrive: direct, mediafire: direct,
};

/** Providers that can resolve live data need a `ref`; without one they behave like a plain link. */
function adapterFor(provider: Provider, hasRef: boolean): ProviderAdapter {
  if (!hasRef && (provider === "modrinth" || provider === "github" || provider === "curseforge" || provider === "mojang")) return direct;
  return ADAPTERS[provider];
}

/** Try sources in priority order and return the first that resolves. Returns null if all fail. */
export async function resolveEntry(entry: LibraryEntry): Promise<{ resolved: Resolved | null; errors: string[] }> {
  const errors: string[] = [];
  for (let i = 0; i < entry.sources.length; i++) {
    const s = entry.sources[i];
    try {
      const resolved = await adapterFor(s.provider, !!s.ref).resolve(entry, s, i);
      return { resolved, errors };
    } catch (e) {
      errors.push(`${entry.id} [${s.provider}] ${(e as Error).message}`);
    }
  }
  return { resolved: null, errors };
}
