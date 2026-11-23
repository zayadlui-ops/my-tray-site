# My Tray — сайт 360.pp.ua

Статичний сайт (HTML + CSS + JS), без збірки й без залежностей. Каталог модулів і дані про програму лежать у `catalog.json`; той самий файл може читати застосунок My Tray.

## Публікація на GitHub Pages
1. На github.com створіть репозиторій (Public) і завантажте всі файли з архіву в корінь: Add file → Upload files → Commit.
2. Settings → Pages → Source: *Deploy from a branch*, гілка `main`, папка `/ (root)` → Save.
3. Через 1–3 хв сайт відкриється на `https://<логін>.github.io/<репозиторій>/`. Перевірте його.
4. Домен: Settings → Pages → Custom domain → `360.pp.ua`. У DNS домену додайте записи A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (звірте з документацією GitHub Pages). Після видачі сертифіката увімкніть Enforce HTTPS.

## Редагування
Усе в `catalog.json` (веб-редактор GitHub: файл → олівець → Commit).
- `app`: `version`, `released` (РРРР-ММ-ДД), `system`, `download_url`, `size_bytes`, `sha256`.
- `modules[]`: `id`, `name`, `summary`/`summary_en`, `description`/`description_en`, `features[]`, `category`, `status` (`available|new|updated|archived|planned|hidden`), `version`, `size_bytes`, `sha256`, `download_url`, `icon`, `requires`, `license`, `author`, `updated`.
- Файли модулів і програми додавайте в GitHub Releases, посилання вставляйте в `download_url`. SHA-256: `Get-FileHash файл -Algorithm SHA256`.
- Іконки модулів (поле `icon`) автоматично з’являються на орбітах у головній анімації.

Поточні записи в `catalog.json` — демонстраційні: версій і посилань немає, кнопки завантаження неактивні, доки ви їх не заповните.
