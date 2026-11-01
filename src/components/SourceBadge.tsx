import type { Source } from "@/lib/library";
import { isUnverified } from "@/lib/library";

const NAME: Record<Source["provider"], string> = {
  modrinth: "Modrinth", curseforge: "CurseForge", github: "GitHub", mojang: "Mojang (official)",
  direct: "Direct link", gdrive: "Google Drive", mediafire: "MediaFire",
};

/** Green = a provider we can query. Red = a mirror we cannot verify automatically. */
const SourceBadge = ({ source }: { source: Source }) => {
  const bad = isUnverified(source);
  return (
    <span className={`mc-src ${bad ? "mc-src--bad" : "mc-src--ok"}`} title={bad ? "Unverified mirror: we cannot check this file automatically" : "Provider can be queried for versions and hashes"}>
      {NAME[source.provider]}{bad ? " · unverified" : ""}
    </span>
  );
};

export default SourceBadge;
