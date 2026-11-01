import type { ProviderAdapter } from "../types.ts";

/** direct, gdrive and mediafire: no API to ask. The link is passed through and marked as unverified. */
export const direct: ProviderAdapter = {
  async resolve(_entry, source, sourceIndex) {
    return {
      version: null,
      downloadUrl: source.url,
      size: null,
      hash: null,
      updated: null,
      changelog: null,
      sourceIndex,
      verified: false,
      fetchedAt: new Date().toISOString(),
    };
  },
};
