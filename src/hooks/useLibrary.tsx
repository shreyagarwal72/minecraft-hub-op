import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BUNDLED, acceptRemote, versionSignature, type LibraryFile, type ResolvedEntry } from "@/lib/library";
import { toast } from "@/lib/toast";

interface LibraryCtx {
  library: LibraryFile;
  entries: ResolvedEntry[];
  /** true once data from the edge function or live client sync has been accepted */
  live: boolean;
  checking: boolean;
  checkForUpdates: (manual?: boolean) => Promise<void>;
  byType: (...t: ResolvedEntry["type"][]) => ResolvedEntry[];
}

const Ctx = createContext<LibraryCtx | null>(null);

const endpoint = () => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  return base ? `${base}/functions/v1/library-resolve` : null;
};

/** Direct client-side resolver: queries Modrinth v2 API & Mojang manifest live (CORS enabled). */
async function directClientSync(curr: LibraryFile): Promise<LibraryFile | null> {
  let hasChanges = false;

  // 1. Live Mojang Version Manifest
  let mojang = curr.mojang;
  try {
    const mRes = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
    if (mRes.ok) {
      const data = await mRes.json();
      const relId = data.latest?.release;
      const snapId = data.latest?.snapshot;
      const relObj = data.versions?.find((v: { id: string }) => v.id === relId);
      const snapObj = data.versions?.find((v: { id: string }) => v.id === snapId);
      if (relObj && snapObj) {
        mojang = {
          latestRelease: { id: relObj.id, type: "release", releaseTime: relObj.releaseTime, url: relObj.url },
          latestSnapshot: { id: snapObj.id, type: "snapshot", releaseTime: snapObj.releaseTime, url: snapObj.url },
          releases: data.versions.filter((v: { type: string }) => v.type === "release").slice(0, 50),
        };
        hasChanges = true;
      }
    }
  } catch {}

  // 2. Live Modrinth entries
  const updatedEntries = await Promise.all(
    curr.entries.map(async (entry) => {
      const mrIdx = entry.sources.findIndex((s) => s.provider === "modrinth" && s.ref);
      if (mrIdx === -1) return entry;
      const source = entry.sources[mrIdx];
      try {
        const slug = encodeURIComponent(source.ref!);
        const [vRes, pRes] = await Promise.all([
          fetch(`https://api.modrinth.com/v2/project/${slug}/version`),
          fetch(`https://api.modrinth.com/v2/project/${slug}`).catch(() => null),
        ]);
        if (!vRes.ok) return entry;
        const versions = await vRes.json();
        const v = versions?.[0];
        if (!v) return entry;
        const file = v.files?.find((f: { primary?: boolean }) => f.primary) ?? v.files?.[0];
        if (!file) return entry;
        const project = pRes && pRes.ok ? await pRes.json() : null;

        const isNewer = !entry.resolved || entry.resolved.version !== v.version_number;
        if (isNewer) hasChanges = true;

        return {
          ...entry,
          resolved: {
            version: v.version_number,
            downloadUrl: file.url,
            size: file.size ?? null,
            hash: file.hashes?.sha512 ? `sha512:${file.hashes.sha512}` : file.hashes?.sha1 ? `sha1:${file.hashes.sha1}` : null,
            updated: v.date_published,
            changelog: v.changelog,
            sourceIndex: mrIdx,
            verified: true,
            fetchedAt: new Date().toISOString(),
            iconUrl: project?.icon_url ?? entry.resolved?.iconUrl ?? null,
            galleryUrl: project?.gallery?.[0]?.url ?? entry.resolved?.galleryUrl ?? null,
          },
        };
      } catch {
        return entry;
      }
    }),
  );

  if (!hasChanges) return null;
  return {
    generatedAt: new Date().toISOString(),
    mojang,
    entries: updatedEntries,
  };
}

/** Reads the generated file first, then refreshes from the edge function or client live sync. */
export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<LibraryFile>(BUNDLED);
  const [live, setLive] = useState(false);
  const [checking, setChecking] = useState(false);
  const current = useRef(library);
  current.current = library;

  const checkForUpdates = useCallback(async (manual = false) => {
    setChecking(true);
    const url = endpoint();

    // Strategy A: Try Supabase Edge Function
    if (url) {
      try {
        const res = await fetch(url, { headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ""}` } });
        if (res.ok) {
          const remote: unknown = await res.json();
          if (acceptRemote(current.current, remote)) {
            const before = versionSignature(current.current);
            const after = versionSignature(remote);
            const changed = Object.keys(after).filter((k) => before[k] !== after[k]);
            setLibrary(remote);
            setLive(true);
            if (changed.length && Object.keys(before).length) {
              toast({ title: "New version!", text: changed.length === 1 ? `${changed[0]} is now ${after[changed[0]]}` : `${changed.length} items have new versions`, icon: "/icons/diamond.png" });
            } else if (manual) {
              toast({ title: "Library refreshed", text: "Everything is current.", icon: "/icons/lapis.png" });
            }
            setChecking(false);
            return;
          }
        }
      } catch {}
    }

    // Strategy B: Direct client-side auto-update fallback (Modrinth + Mojang)
    try {
      const clientUpdate = await directClientSync(current.current);
      if (clientUpdate) {
        const before = versionSignature(current.current);
        const after = versionSignature(clientUpdate);
        const changed = Object.keys(after).filter((k) => before[k] !== after[k]);
        setLibrary(clientUpdate);
        setLive(true);
        if (changed.length && Object.keys(before).length) {
          toast({ title: "Live update synced!", text: `${changed.length} items updated with latest versions`, icon: "/icons/diamond.png" });
        } else if (manual) {
          toast({ title: "Library updated", text: "Latest versions loaded from official sources.", icon: "/icons/lapis.png" });
        }
      } else if (manual) {
        toast({ title: "Already up to date", text: "Latest versions verified.", icon: "/icons/grass.png" });
      }
    } catch {
      if (manual) toast({ title: "Notice", text: "Using bundled library data.", icon: "/icons/obsidian.png" });
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => { void checkForUpdates(false); }, [checkForUpdates]);

  const value = useMemo<LibraryCtx>(
    () => ({ library, entries: library.entries, live, checking, checkForUpdates, byType: (...t) => library.entries.filter((e) => t.includes(e.type)) }),
    [library, live, checking, checkForUpdates],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useLibrary = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLibrary must be used inside <LibraryProvider>");
  return c;
};
