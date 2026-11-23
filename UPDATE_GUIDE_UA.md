# Публікація та оновлення сайту (v7)

## Перша публікація на GitHub Pages
1. github.com → New repository (Public), наприклад `mytray-site`.
2. Add file → Upload files: перетягніть **вміст** розпакованого архіву (файли й папку `media`), не папку-обгортку → Commit changes.
3. Settings → Pages → Source: Deploy from a branch, гілка `main`, `/ (root)` → Save. Через 1–3 хв сайт буде на `https://<логін>.github.io/mytray-site/`.
4. Домен: Settings → Pages → Custom domain → `360.pp.ua`. У DNS домену додайте A-записи 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (звірте з документацією GitHub Pages), після видачі сертифіката увімкніть Enforce HTTPS. **Не видаляйте файл `CNAME`**, який створить GitHub.
5. Якщо в репозиторії вже є сайт: замініть `index.html`, `style.css`, `app.js`, `catalog.json` і додайте нові файли.

## Додати модуль
Відкрийте `catalog.json` на GitHub → олівець → додайте об’єкт у кінець `modules` (скопіюйте існуючий, змініть `id`, `name`, `abbr`, тексти, `status`) → Commit. Через 1–2 хв модуль з’явиться на орбіті. Перевірте JSON на jsonlint.com: зайва кома ламає каталог.

## Додати відео
Покладіть файл у `media/` (див. `media/README_UA.txt`), впишіть `"video_url": "media/назва.mp4"`.

## Оновити програму
У блоці `application` вкажіть `version`, `release_date`, `size`, `sha256` (`Get-FileHash файл -Algorithm SHA256`) і `download_url` (HTTPS, наприклад файл у GitHub Releases). Тоді кнопка «Завантажити My Tray» стане активною.

## Після оновлення
Відкрийте сайт у приватній вкладці або Ctrl+F5. Якщо змінювали CSS/JS, збільште `?v=7` в `index.html`.
Перевірка: орбіти обертаються, клік на літери відкриває сторінку модуля, EN/UA перемикається.
