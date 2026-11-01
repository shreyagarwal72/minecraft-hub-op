import McButton from "@/components/McButton";
import SourceBadge from "@/components/SourceBadge";
import { toast } from "@/lib/toast";
import { formatDate, formatSize, primarySource, TYPE_LABEL, type ResolvedEntry } from "@/lib/library";

interface Props {
  entry: ResolvedEntry;
  /** show as a Java "Select World" style row instead of a card */
  row?: boolean;
  extra?: React.ReactNode;
}

/** One library entry. Download URLs only ever come from the library, never from page code. */
const LibraryCard = ({ entry, row = false, extra }: Props) => {
  const { source, url, mirrors } = primarySource(entry);
  const size = formatSize(entry.resolved?.size);
  const version = entry.resolved?.version;
  const dead = !!entry.unavailable;
  const pageOnly = !entry.resolved?.verified && (source.provider === "mojang" || source.provider === "modrinth") && url === source.url;
  const label = entry.type === "launcher" || entry.type === "version" ? (pageOnly ? "Open official page" : "Get it") : "Download";
  const thumb = entry.resolved?.galleryUrl || entry.resolved?.iconUrl || entry.image;

  return (
    <article className={`mc-panel mc-card mc-lib ${row ? "mc-lib--row" : ""} ${dead ? "mc-lib--dead" : ""}`} id={entry.id}>
      <div className="mc-lib__thumb mc-slot">
        <img src={thumb} alt={entry.title} loading="lazy" />
      </div>
      <div className="mc-lib__body">
        <h3 className="mc-card__title">{entry.title}</h3>
        <div className="mc-chips" style={{ marginTop: 8 }}>
          <span className="mc-tip mc-tip--aqua">{TYPE_LABEL[entry.type]}</span>
          {version && <span className="mc-tip mc-tip--yellow">{version}</span>}
          {entry.mcVersions.map((v) => <span key={v} className="mc-tip mc-tip--green">MC {v}</span>)}
          {entry.loaders.map((l) => <span key={l} className="mc-tip">{l}</span>)}
        </div>
        <p className="mc-card__text">{entry.description}</p>
        <p className="mc-card__meta">
          <SourceBadge source={source} /> · by {entry.author} · {size ? `${size} · ` : ""}
          {source.checked ? `verified ${formatDate(source.lastChecked)}` : "not verified yet"} · updated {formatDate(entry.resolved?.updated ?? entry.updated)}
        </p>
        {entry.tags.length > 0 && (
          <ul className="mc-chips mc-tags" aria-label="Tags">
            {entry.tags.map((t) => <li key={t} className="mc-tag">#{t}</li>)}
          </ul>
        )}
        {dead && entry.note && <p className="mc-warn-line">{entry.note}</p>}
        {mirrors.length > 0 && !dead && (
          <details className="mc-mirrors">
            <summary>Mirrors ({mirrors.length})</summary>
            <ul>
              {mirrors.map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer">{m.label}</a> <SourceBadge source={m} />
                </li>
              ))}
            </ul>
          </details>
        )}
        {extra}
        <div className="mc-lib__actions">
          {dead ? (
            <McButton disabled variant="dark">Unavailable</McButton>
          ) : (
            <McButton
              href={url}
              variant="green"
              sub={source.label}
              onClick={() => toast({ title: "Opening download", text: entry.title, icon: "/icons/diamond.png" })}
            >
              {label}
            </McButton>
          )}
        </div>
      </div>
    </article>
  );
};

export default LibraryCard;
