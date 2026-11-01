import { useMemo, useState } from "react";
import { TYPE_LABEL, type EntryType, type ResolvedEntry } from "@/lib/library";

export type SortKey = "recommended" | "updated" | "name";

/** Search, type, MC version, loader and tag filters plus sorting. Entries with no mcVersions match every version. */
export const useEntryFilters = (entries: ResolvedEntry[]) => {
  const [q, setQ] = useState("");
  const [type, setType] = useState<EntryType | "all">("all");
  const [mc, setMc] = useState("all");
  const [loader, setLoader] = useState("all");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("recommended");

  const options = useMemo(() => {
    const uniq = (xs: string[]) => Array.from(new Set(xs)).sort();
    return {
      types: uniq(entries.map((e) => e.type)) as EntryType[],
      versions: uniq(entries.flatMap((e) => e.mcVersions)),
      loaders: uniq(entries.flatMap((e) => e.loaders)),
      tags: uniq(entries.flatMap((e) => e.tags)),
    };
  }, [entries]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = entries.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (mc !== "all" && e.mcVersions.length && !e.mcVersions.includes(mc)) return false;
      if (loader !== "all" && e.loaders.length && !e.loaders.includes(loader)) return false;
      if (tag && !e.tags.includes(tag)) return false;
      if (needle && !`${e.title} ${e.description} ${e.author} ${e.tags.join(" ")} ${TYPE_LABEL[e.type]}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    if (sort === "name") out.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "updated") out.sort((a, b) => Date.parse(b.resolved?.updated ?? b.updated) - Date.parse(a.resolved?.updated ?? a.updated));
    return out;
  }, [entries, q, type, mc, loader, tag, sort]);

  const reset = () => { setQ(""); setType("all"); setMc("all"); setLoader("all"); setTag(null); setSort("recommended"); };
  return { q, setQ, type, setType, mc, setMc, loader, setLoader, tag, setTag, sort, setSort, options, filtered, reset };
};

export type EntryFilters = ReturnType<typeof useEntryFilters>;
