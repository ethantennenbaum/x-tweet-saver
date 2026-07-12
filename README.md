<!-- Language switch: [English](#x-tweet-saver) · [Русский](#x-tweet-saver-русский) -->

# X Tweet Saver

**Export all your tweets and replies from X (Twitter) to a single JSON file, and download videos with one click. Free, open-source, runs entirely in your browser — nothing is uploaded anywhere.**

I built this because the only existing tool for exporting tweets hid behind a
paywall and capped you at 250 tweets. That's silly for something this simple.
So here it is, MIT-licensed. Take it, fork it, do whatever.

*(Русская версия ниже — [перейти](#x-tweet-saver-русский).)*

---

## What it does

- **Saves tweets & replies to JSON** — with full stats (likes, retweets, replies,
  quotes, bookmarks, views), timestamps, full text of long tweets, media links,
  and thread/quote relationships. Data comes from X's own internal API responses,
  not from scraping the HTML, so it's clean and complete.
- **Download button on every video** — grabs the highest-quality MP4.
- **100% local.** No servers, no tracking, no account. The code just reads what
  your browser already loads and hands it back to you as a file.

### Limitations (please read before opening issues)

- X only serves roughly the **last ~3200 tweets** per profile through its
  timeline. That's X's limit, not this tool's. Older tweets can only be reached
  via date-filtered search.
- The video button appears on a clip **once its data has loaded** through the API
  (normally as you scroll to it). If it's missing, scroll the video out of view
  and back.
- If X renames its internal API operations, collection may stop working until the
  `RELEVANT` list in `interceptor.js` is updated (see [Troubleshooting](#troubleshooting)).

---

## Installation

This isn't in the Chrome Web Store — you install it manually ("unpacked"). It
takes about two minutes and works in **Chrome, Edge, Brave, Arc, Opera** and any
other Chromium-based browser.

### Step 1 — Download the files

- Click the green **`Code`** button at the top of this page → **Download ZIP**.
- Unzip it somewhere you won't accidentally delete (e.g. a `Tools` folder).
  You should end up with a folder containing `manifest.json`, `content.js`, etc.


### Step 2 — Open the extensions page

- **Chrome / Brave / Opera:** type `chrome://extensions` in the address bar and press Enter.
- **Edge:** type `edge://extensions` instead.

### Step 3 — Turn on Developer mode

- Find the **Developer mode** toggle (top-right corner in Chrome; left sidebar in Edge) and switch it **on**.

### Step 4 — Load the extension

- Click **Load unpacked**.
- Select the **folder** you unzipped in Step 1 (the one that contains
  `manifest.json` — select the folder itself, not a file inside it).
- Done. You'll see "X Tweet Saver" appear in your extensions list.

### Step 5 — Pin it (optional but handy)

- Click the puzzle-piece icon in the toolbar, to the right of the address bar.
- Click the pin next to "X Tweet Saver" so its icon stays visible.

---

## How to use

### Export tweets
1. Go to a profile, e.g. `https://x.com/itan_tennenbaum`.
   For replies too, open the profile's **With replies** tab.
2. Click the **extension icon** in the toolbar — a small panel appears on the right.
3. Click **Старт / Start**. It auto-scrolls and collects; the counter goes up.
4. When the counter stops growing and it says **Done**, click **Download JSON**.
5. **Stop** halts collection early; **Clear** resets before a new profile.

### Download a video
- Hover over any video — a round **⬇** button sits in its top-right corner. Click it.
- Icon meanings: ⬇ ready · … downloading · ✓ saved · ↗ opened in a new tab
  (fallback if the browser blocks a direct save).

---

## Troubleshooting

**The panel doesn't appear.** Make sure you're on an `x.com` or `twitter.com`
page, then click the extension icon. Reload the tab if you just installed it.

**The counter stays at 0 while scrolling.** X may have renamed its internal API
operations. Open DevTools (F12) → **Network**, scroll the timeline, and look for
requests containing `graphql`. Note the operation name in the URL (e.g.
`UserTweets`) and add it to the `RELEVANT` array in `interceptor.js`, then reload
the extension. PRs welcome.

**A video has no ⬇ button.** Its data hasn't loaded through the API yet. Scroll it
out of view and back. Live/DRM-protected streams aren't supported.

---

## How it works (for the curious)

- `interceptor.js` runs in the page's own context (MAIN world) and wraps
  `fetch` / `XMLHttpRequest` so it can read X's GraphQL responses as they arrive.
- `content.js` runs in an isolated context, parses those responses, dedupes
  tweets by ID into an in-memory map (X keeps only ~15 tweets in the DOM at once,
  so the collector has to persist across scrolls), indexes videos by tweet ID,
  and builds the UI.
- `background.js` toggles the panel when you click the toolbar icon.

Permissions are deliberately minimal: `activeTab` plus host access to
`x.com` / `twitter.com`. No storage, no network calls of its own, no analytics.

## License

[MIT](LICENSE). Use it, fork it, ship it, sell your fork — whatever. No warranty.

---
---

# X Tweet Saver (Русский)

**Выгрузка всех твитов и реплаев из X (Twitter) в один JSON-файл и скачивание видео в один клик. Бесплатно, открытый код, всё работает локально в браузере — никуда ничего не отправляется.**

> Я сделал это, потому что единственный существующий инструмент для экспорта
> твитов прятался за пейволлом и ограничивал 250 твитами. Для такой простой
> задачи это ерунда. Так что вот, под лицензией MIT. Берите, форкайте, делайте
> что хотите.

---

## Что делает

- **Сохраняет твиты и реплаи в JSON** — с полной статистикой (лайки, репосты,
  ответы, цитаты, закладки, просмотры), датами, полным текстом длинных твитов,
  ссылками на медиа и связями тредов/цитат. Данные берутся из внутренних
  ответов API самого X, а не парсингом HTML, — поэтому чисто и полно.
- **Кнопка скачивания на каждом видео** — забирает mp4 в максимальном качестве.
- **100% локально.** Ни серверов, ни трекинга, ни аккаунта. Аддон просто читает
  то, что браузер уже загрузил, и отдаёт вам файлом.

### Ограничения (прочитайте перед созданием issue)

- X отдаёт примерно **последние ~3200 твитов** на профиль через таймлайн. Это
  ограничение X, а не аддона. Более старое достаётся только через поиск по датам.
- Кнопка на видео появляется, **когда данные ролика пришли** через API (обычно
  при прокрутке к нему). Если её нет — проскролльте видео из виду и обратно.
- Если X переименует внутренние операции API, сбор может перестать работать, пока
  не обновишь список `RELEVANT` в `interceptor.js` (см. [Если что-то не работает](#если-что-то-не-работает)).

---

## Установка

Аддона нет в Chrome Web Store — он ставится вручную («распакованным»). Это
занимает пару минут и работает в **Chrome, Edge, Brave, Arc, Opera** и любом
другом браузере на движке Chromium.

### Шаг 1 — Скачайте файлы

- Нажмите зелёную кнопку **`Code`** вверху страницы → **Download ZIP**.
- Распакуйте архив туда, где случайно не удалите (например, папка `Tools`).
  Должна получиться папка с файлами `manifest.json`, `content.js` и т.д.

*(Или, если пользуетесь git: `git clone` этого репозитория.)*

### Шаг 2 — Откройте страницу расширений

- **Chrome / Brave / Opera:** введите `chrome://extensions` в адресной строке и нажмите Enter.
- **Edge:** введите `edge://extensions`.

### Шаг 3 — Включите режим разработчика

- Найдите переключатель **Режим разработчика** (в Chrome — правый верхний угол; в Edge — левая панель) и включите его.

### Шаг 4 — Загрузите аддон

- Нажмите **Загрузить распакованное расширение** (Load unpacked).
- Выберите **папку**, которую распаковали на Шаге 1 (ту, где лежит `manifest.json`, —
  именно папку, а не файл внутри неё).
- Готово. В списке расширений появится «X Tweet Saver».

### Шаг 5 — Закрепите иконку (по желанию, но удобно)

- Нажмите на иконку-пазл справа от адресной строки.
- Нажмите на «булавку» рядом с «X Tweet Saver», чтобы иконка осталась на панели.

---

## Как пользоваться

### Экспорт твитов
1. Откройте профиль, например `https://x.com/itan_tennenbaum`.
   Чтобы забрать и реплаи — откройте вкладку **With replies**.
2. Нажмите на **иконку аддона** в тулбаре — справа появится панель.
3. Нажмите **Старт**. Идёт автоскролл и сбор, счётчик растёт.
4. Когда счётчик перестанет расти и появится **Готово** — нажмите **Скачать JSON**.
5. **Стоп** прерывает сбор; **Очистить** сбрасывает накопитель перед новым профилем.

### Скачивание видео
- Наведитесь на ролик — в правом верхнем углу круглая кнопка **⬇**. Нажмите.
- Значки: ⬇ готово · … качается · ✓ скачано · ↗ открылось в новой вкладке
  (запасной путь, если браузер заблокировал прямое сохранение).

---

## Если что-то не работает

**Панель не появляется.** Убедитесь, что вы на странице `x.com` или `twitter.com`,
и нажмите на иконку аддона. Перезагрузите вкладку, если только что установили.

**Счётчик стоит на 0 при скролле.** Возможно, X переименовал внутренние операции
API. Откройте DevTools (F12) → **Network**, проскролльте ленту и найдите запросы
со словом `graphql`. Посмотрите имя операции в URL (например, `UserTweets`) и
добавьте его в массив `RELEVANT` в `interceptor.js`, затем обновите аддон.
PR приветствуются.

**На видео нет кнопки ⬇.** Данные ролика ещё не пришли через API. Проскролльте
его из виду и обратно. Прямые эфиры и DRM-защищённые потоки не поддерживаются.

---

## Как это устроено (для любопытных)

- `interceptor.js` работает в контексте самой страницы (MAIN world) и оборачивает
  `fetch` / `XMLHttpRequest`, чтобы читать ответы GraphQL X по мере их прихода.
- `content.js` работает в изолированном контексте, парсит эти ответы,
  дедуплицирует твиты по ID в накопитель в памяти (X держит в DOM только ~15
  твитов за раз, поэтому накопитель живёт между скроллами), индексирует видео по
  ID твита и строит интерфейс.
- `background.js` показывает/прячет панель по клику на иконку.

Разрешения намеренно минимальны: `activeTab` плюс доступ к `x.com` / `twitter.com`.
Никакого хранилища, никаких собственных сетевых запросов, никакой аналитики.

## Лицензия

[MIT](LICENSE). Пользуйтесь, форкайте, распространяйте — что угодно. Без гарантий.
