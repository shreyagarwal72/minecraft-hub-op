/** Per-route SEO text. Used by <SEOHead /> at runtime and by scripts/prerender.ts at build time. */
export const ROUTE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  "/": {
    "title": "Minecraft Java Hub - Worlds, Shaders, Modpacks & Launchers",
    "description": "Free Minecraft Java Edition hub: download custom worlds, shaders, optimized modpacks and the best launchers. Guides for Windows, Linux and Android (Pojav).",
    "keywords": "minecraft java edition, minecraft worlds download, minecraft shaders, minecraft modpacks, minecraft launcher, modrinth, pojav launcher, minecraft java hub"
  },
  "/worlds": {
    "title": "Minecraft Java Worlds - Download Custom Maps | Minecraft Java Hub",
    "description": "Browse downloadable Minecraft Java Edition worlds: huge community builds, castles and redstone cities. Every file is labelled with its source.",
    "keywords": "minecraft java worlds, minecraft world download, bulky star world, minecraft maps, java edition worlds"
  },
  "/worlds/bulky-star": {
    "title": "Bulky Star Minecraft Worlds - 15k Days & Infinity Castle | Minecraft Java Hub",
    "description": "Download Bulky Star's Minecraft Java worlds: the 15,000 days survival world and the Infinity Castle. File sizes, versions and source labels included.",
    "keywords": "bulky star world, bulky star 15k days, minecraft infinity castle, minecraft world download"
  },
  "/modpacks": {
    "title": "Minecraft Java Modpacks - Pojav & Performance Packs | Minecraft Java Hub",
    "description": "Download Minecraft Java modpacks including Spunky Boost for Pojav Launcher and Spunky Optimised. Pick packs, check versions and sources, then download.",
    "keywords": "minecraft modpacks, pojav modpack, spunky boost, spunky optimised, minecraft performance modpack"
  },
  "/shaders": {
    "title": "Minecraft Java Shaders - BSL, Complementary, Photon | Minecraft Java Hub",
    "description": "Get BSL, Complementary Reimagined and Photon shaders for Minecraft Java Edition from their official Modrinth and author pages. Needs Iris or OptiFine.",
    "keywords": "minecraft shaders, bsl shaders, complementary reimagined, photon shader, iris shaders, java edition shaders"
  },
  "/downloads": {
    "title": "Download Minecraft Java Edition - Launchers & Latest Version | Minecraft Java Hub",
    "description": "Get Minecraft Java Edition with the official launcher, Modrinth App or Prism Launcher. The latest release and snapshot are read from Mojang's manifest.",
    "keywords": "download minecraft java, minecraft launcher, modrinth app, prism launcher, minecraft latest version"
  },
  "/patch": {
    "title": "Minecraft Java Patch & Latest Versions - Release and Snapshot | Minecraft Java Hub",
    "description": "See the latest Minecraft Java Edition release and snapshot straight from Mojang, plus a free Mrpack to Zip converter for modpacks.",
    "keywords": "minecraft latest version, minecraft snapshot, minecraft java patch, mrpack to zip"
  },
  "/faq": {
    "title": "FAQ - Minecraft Java Hub Frequently Asked Questions",
    "description": "Answers about Minecraft Java shaders, launchers, modpacks, versions, and installation guides. Browse frequently asked questions on Minecraft Java Hub.",
    "keywords": "minecraft java faq, minecraft shader install, minecraft launcher help, pojav modpack, minecraft java hub"
  }
};
