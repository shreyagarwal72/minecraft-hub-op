import FilterBar from "@/components/FilterBar";
import LibraryCard from "@/components/LibraryCard";
import Reveal from "@/components/Reveal";
import { useEntryFilters } from "@/hooks/useEntryFilters";
import type { ResolvedEntry } from "@/lib/library";

interface Props { entries: ResolvedEntry[]; showType?: boolean; idPrefix?: string }

/** Client-side browser: search, type, MC version, loader, tags, sort. */
const LibraryBrowser = ({ entries, showType = true, idPrefix = "lib" }: Props) => {
  const f = useEntryFilters(entries);
  return (
    <div className="mc-stack" style={{ ["--gap" as string]: "20px" }}>
      <FilterBar f={f} showType={showType} idPrefix={idPrefix} />
      {f.filtered.length === 0 ? (
        <p className="mc-panel mc-panel--dark mc-center">Nothing matches. Try resetting the filters.</p>
      ) : (
        <div className="mc-grid mc-grid--2">
          {f.filtered.map((e, i) => (
            <Reveal key={e.id} delay={(i % 2) * 0.08}>
              <LibraryCard entry={e} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryBrowser;
