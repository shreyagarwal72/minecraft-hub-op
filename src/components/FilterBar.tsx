import McButton from "@/components/McButton";
import { TYPE_LABEL } from "@/lib/library";
import type { EntryFilters, SortKey } from "@/hooks/useEntryFilters";

interface Props { f: EntryFilters; showType?: boolean; idPrefix?: string }

const FilterBar = ({ f, showType = true, idPrefix = "f" }: Props) => (
  <section className="mc-panel mc-panel--dark mc-filters" aria-label="Filter the library">
    <div className="mc-filters__grid">
      <label className="mc-field mc-field--wide" htmlFor={`${idPrefix}-q`}>
        <span>Search</span>
        <input id={`${idPrefix}-q`} className="mc-input" type="search" value={f.q} onChange={(e) => f.setQ(e.target.value)} placeholder="Name, tag or author" />
      </label>
      {showType && (
        <label className="mc-field" htmlFor={`${idPrefix}-type`}>
          <span>Type</span>
          <select id={`${idPrefix}-type`} className="mc-select" value={f.type} onChange={(e) => f.setType(e.target.value as never)}>
            <option value="all">All types</option>
            {f.options.types.map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
          </select>
        </label>
      )}
      <label className="mc-field" htmlFor={`${idPrefix}-mc`}>
        <span>MC version</span>
        <select id={`${idPrefix}-mc`} className="mc-select" value={f.mc} onChange={(e) => f.setMc(e.target.value)}>
          <option value="all">Any version</option>
          {f.options.versions.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </label>
      <label className="mc-field" htmlFor={`${idPrefix}-loader`}>
        <span>Loader</span>
        <select id={`${idPrefix}-loader`} className="mc-select" value={f.loader} onChange={(e) => f.setLoader(e.target.value)}>
          <option value="all">Any loader</option>
          {f.options.loaders.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </label>
      <label className="mc-field" htmlFor={`${idPrefix}-sort`}>
        <span>Sort</span>
        <select id={`${idPrefix}-sort`} className="mc-select" value={f.sort} onChange={(e) => f.setSort(e.target.value as SortKey)}>
          <option value="recommended">Recommended</option>
          <option value="updated">Recently updated</option>
          <option value="name">Name</option>
        </select>
      </label>
    </div>
    {f.options.tags.length > 0 && (
      <div className="mc-chips" role="group" aria-label="Tags" style={{ marginTop: 12 }}>
        {f.options.tags.map((t) => (
          <button key={t} type="button" className="mc-tag mc-tag--btn" aria-pressed={f.tag === t} onClick={() => f.setTag(f.tag === t ? null : t)}>
            #{t}
          </button>
        ))}
      </div>
    )}
    <div className="mc-row mc-row--between" style={{ marginTop: 12 }}>
      <span className="mc-muted" role="status">{f.filtered.length} result{f.filtered.length === 1 ? "" : "s"}</span>
      <McButton size="sm" variant="dark" onClick={f.reset}>Reset filters</McButton>
    </div>
  </section>
);

export default FilterBar;
