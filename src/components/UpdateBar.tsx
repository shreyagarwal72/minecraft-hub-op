import McButton from "@/components/McButton";
import { useLibrary } from "@/hooks/useLibrary";
import { formatDate } from "@/lib/library";

/** Shows where the data came from and lets the visitor refresh it. */
const UpdateBar = () => {
  const { library, live, checking, checkForUpdates } = useLibrary();
  const synced = Date.parse(library.generatedAt) > 0;
  return (
    <div className="mc-updatebar mc-panel mc-panel--dark">
      <span>
        <b className="t-yellow" style={{ fontWeight: 400 }}>Library:</b>{" "}
        {live ? "live from the server" : synced ? "bundled snapshot" : "links only (version data not loaded)"}
        {synced && <> · generated {formatDate(library.generatedAt)}</>}
      </span>
      <McButton size="sm" variant="dark" disabled={checking} onClick={() => void checkForUpdates(true)}>
        {checking ? "Checking..." : "Check for updates"}
      </McButton>
    </div>
  );
};

export default UpdateBar;
