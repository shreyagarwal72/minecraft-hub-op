import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BUNDLED, acceptRemote, versionSignature, type LibraryFile, type ResolvedEntry } from "@/lib/library";
import { toast } from "@/lib/toast";

interface LibraryCtx {
  library: LibraryFile;
  entries: ResolvedEntry[];
  /** true once data from the edge function has been accepted */
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

/** Reads the generated file first, then refreshes from the edge function. */
export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<LibraryFile>(BUNDLED);
  const [live, setLive] = useState(false);
  const [checking, setChecking] = useState(false);
  const current = useRef(library);
  current.current = library;

  const checkForUpdates = useCallback(async (manual = false) => {
    const url = endpoint();
    if (!url) {
      if (manual) toast({ title: "Live updates are off", text: "VITE_SUPABASE_URL is not set, showing the bundled library.", kind: "error" });
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ""}` } });
      if (!res.ok) throw new Error(String(res.status));
      const remote: unknown = await res.json();
      if (!acceptRemote(current.current, remote)) {
        if (manual) toast({ title: "Already up to date", text: "No newer valid data from the server.", icon: "/icons/lapis.png" });
        return;
      }
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
    } catch {
      if (manual) toast({ title: "Could not reach the server", text: "Showing the bundled library.", kind: "error" });
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
