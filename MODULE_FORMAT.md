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
