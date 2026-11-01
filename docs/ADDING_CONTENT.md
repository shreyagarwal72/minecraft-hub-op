# Adding content

Every world, shader, modpack, launcher and mod on the site comes from **one list**. Page code never contains a download link.

## 1. Add one object to `content/library.json`

```json
{
  "id": "my-new-shader",
  "type": "shader",
  "title": "My New Shader",
  "description": "One or two plain sentences.",
  "image": "/library/my-new-shader.jpg",
  "tags": ["shader", "lighting"],
  "mcVersions": ["1.21.8"],
  "loaders": ["iris"],
  "license": "MIT",
  "author": "Someone",
  "updated": "2026-11-01",
  "sources": [
    { "provider": "modrinth", "ref": "project-slug", "url": "https://modrinth.com/shader/project-slug", "label": "On Modrinth", "checked": false, "lastChecked": null },
    { "provider": "mediafire", "url": "https://www.mediafire.com/...", "label": "MediaFire mirror (unverified)", "checked": false, "lastChecked": null }
  ]
}
```

Rules:

- `id` is unique and URL safe.
- `type` is one of `version | launcher | modpack | shader | resourcepack | mod | world`.
- Put the image in `public/library/` and use the `/library/...` path.
- **Source order is priority order.** The first source that works is shown as the main button. The others appear under "Mirrors".
- `mcVersions: []` or `loaders: []` means "unknown", and the entry shows up under every version or loader filter.
- Set `"unavailable": true` and a `"note"` if the files are gone. The card is greyed out and has no download button.

## 2. Provider `ref` values

| provider | `ref` | what the adapter reads |
| --- | --- | --- |
| `modrinth` | project slug | newest version, file URL, size, SHA-512, changelog |
| `github` | `owner/repo` (plus optional `assetPattern` regex) | latest release, asset URL, size, digest |
| `curseforge` | numeric project id | newest file (needs `CURSEFORGE_API_KEY` on the server) |
| `mojang` | `release` or `snapshot` | version id and date from the version manifest |
| `direct`, `gdrive`, `mediafire` | none | nothing. The link is passed through and marked **unverified** |

A source with no `ref` is treated as a plain link.

## 3. Sync and check

```bash
npm run library:sync     # writes src/data/library.generated.json
npm run library:check    # HEAD/GET-checks every URL, exits 1 if any is dead or expired
npm run library:check -- --write   # also updates "checked" and "lastChecked" in library.json
```

`library:check` also decodes the `ex=` expiry of Discord CDN links and fails on expired ones.

## 4. Optional: add content without a deploy (Supabase table)

```sql
create table public.library_entries (
  id   text primary key,
  data jsonb not null          -- one entry, same shape as in library.json
);
alter table public.library_entries enable row level security;
-- no public policies: only the edge function (service role) reads this table
```

Set the secret `SUPABASE_SERVICE_ROLE_KEY` on the `library-resolve` function. Rows with the same `id` as a JSON entry replace it. Rows are validated only by shape, so keep every source on `https://`.
