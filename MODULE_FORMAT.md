# My Tray Module Catalog — data contract draft

The website currently reads `catalog.json` at the repository root. The same JSON document is intended to be consumed by the My Tray client in a future release. Module records are descriptive metadata; the actual module package is hosted separately (for example, in a GitHub Release).

## Catalog fields
- `catalog_version`: integer, version of this catalog structure.
- `updated_at`: ISO date.
- `application`: optional application release metadata.
- `categories`: array of category names.
- `modules`: array of module records.

## Module fields
- `id`: stable unique slug; required for client integration.
- `name`: display title.
- `version`: module version.
- `release_date`: ISO date.
- `status`: `available`, `beta`, `planned`, `hidden`, or `archived`.
- `category`: category name.
- `icon`: short glyph (website placeholder; client may use its own icon format).
- `short_description`: short card text.
- `description`: detailed text.
- `author`: publisher name or handle.
- `compatibility`: human-readable compatibility range; later should become structured version constraints.
- `license`: license name or URL.
- `size`: package size display string.
- `download_url`: HTTPS URL to package file.
- `sha256`: SHA-256 hash of package, hex string; recommended before client-side installation.
- `repository_url`: optional source repository.
- `preview_url`: optional documentation or screenshots.

## Example (not a real published module)
```json
{
  "id": "example-module",
  "name": "Example module",
  "version": "1.0.0",
  "release_date": "2026-11-22",
  "status": "available",
  "category": "Інші",
  "icon": "◈",
  "short_description": "Short module summary.",
  "description": "Longer description of the example module.",
  "author": "Example author",
  "compatibility": "My Tray 1.x",
  "license": "MIT",
  "size": "2 MB",
  "download_url": "https://github.com/OWNER/REPO/releases/download/v1.0.0/module.zip",
  "sha256": "",
  "repository_url": "https://github.com/OWNER/REPO",
  "preview_url": ""
}
```

## Recommended future client flow
1. Fetch the catalog from the official HTTPS URL (cache with expiration; retain last-known-good copy).
2. Parse and validate schema version and module metadata.
3. Display details and source before downloading.
4. Download package from HTTPS to a temporary location.
5. Verify SHA-256 against catalog metadata; fail closed if a hash is provided and doesn't match.
6. Inspect package manifest and compatibility; ask for confirmation before installation.
7. Install to a defined module directory and maintain rollback/uninstall support.

The website's current JavaScript only displays and links to metadata downloads. It does **not** install, validate, or execute modules. Client integration, package manifest validation, signatures, moderation, and installer logic are future work.

## v7: поля для сайту (необов’язкові, зворотно сумісні)
- `abbr`: 2–3 літери на орбіті (наприклад `MW`). Якщо порожньо, береться з назви: «Motion Wallpaper» → MW.
- `features` / `features_en`: список можливостей на сторінці модуля.
- `video_url`: коротке відео функціоналу, HTML5 `.mp4` (H.264) або `.webm`; шлях `media/файл.mp4` або `https://…`. Flash не підтримується жодним браузером.
- `poster_url`: кадр-обкладинка відео.
- `name_en`, `short_description_en`, `description_en`: англійські тексти.
- Порядок у `modules` = порядок орбіт від центру назовні. Новий модуль, доданий у кінець списку, сам з’являється на новій зовнішній орбіті; існуючі орбіти не зсуваються (до 6 модулів). Статуси `hidden` і `archived` на орбіті не показуються.

**Важливо:** сайт модулі не завантажує. Поля `download_url` і `sha256` читає лише програма My Tray; на сторінках сайту вони не відображаються.
