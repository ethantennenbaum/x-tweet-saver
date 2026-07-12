# X Tweet Saver

**Экспорт всех твитов и реплаев профиля X (Twitter) в JSON + скачивание видео в один клик. Бесплатно, открытый код, всё локально в браузере.**

*(English below — [jump](#english).)*

## Что делает

- Сохраняет твиты и реплаи в JSON со всей статистикой (лайки, репосты, ответы, цитаты, закладки, просмотры), датами, полным текстом и медиа. Данные берутся из внутреннего API самого X, а не парсингом HTML.
- Кнопка ⬇ на каждом видео — качает mp4 в максимальном качестве.
- Ничего никуда не отправляется: ни серверов, ни трекинга, ни аккаунта.

## Установка

Аддона нет в Chrome Web Store, ставится вручную (работает в Chrome, Edge, Brave, Arc, Opera):

1. Кнопка **`Code`** вверху страницы → **Download ZIP**, распаковать.
2. Открыть `chrome://extensions` (в Edge — `edge://extensions`).
3. Включить **Режим разработчика** (переключатель в углу).
4. **Загрузить распакованное расширение** → выбрать распакованную папку (ту, где лежит `manifest.json`).

## Как пользоваться

**Твиты:** открой профиль (для реплаев — вкладку *With replies*) → кликни иконку аддона → **Старт**. Когда счётчик перестанет расти — **Скачать JSON**.

**Видео:** наведись на ролик и нажми кнопку ⬇ в углу.

## Ограничения

- X отдаёт примерно последние ~3200 твитов на профиль (это лимит X, не аддона).
- Кнопка на видео появляется, когда данные ролика подгрузились — если её нет, проскролль видео из виду и обратно.
- Если X переименует свои API-операции и сбор перестанет работать — обнови список `RELEVANT` в `interceptor.js`.

## Лицензия

[MIT](LICENSE) — делайте что хотите, без гарантий.

---
<a name="english"></a>

# X Tweet Saver (English)

**Export all tweets and replies from an X (Twitter) profile to JSON, plus one-click video download. Free, open-source, fully local.**

## What it does

- Saves tweets and replies to JSON with full stats (likes, retweets, replies, quotes, bookmarks, views), timestamps, full text and media. Data comes from X's own internal API, not HTML scraping.
- A ⬇ button on every video grabs the highest-quality MP4.
- Nothing is uploaded anywhere: no servers, no tracking, no account.

## Installation

Not in the Chrome Web Store — install it manually (works in Chrome, Edge, Brave, Arc, Opera):

1. **`Code`** button at the top → **Download ZIP**, unzip it.
2. Open `chrome://extensions` (Edge: `edge://extensions`).
3. Turn on **Developer mode** (toggle in the corner).
4. **Load unpacked** → select the unzipped folder (the one containing `manifest.json`).

## How to use

**Tweets:** open a profile (for replies, the *With replies* tab) → click the extension icon → **Start**. When the counter stops growing, click **Download JSON**.

**Video:** hover a clip and click the ⬇ button in its corner.

## Limitations

- X only serves roughly the last ~3200 tweets per profile (X's limit, not this tool's).
- The video button appears once the clip's data has loaded — if it's missing, scroll the video out of view and back.
- If X renames its API operations and collection stops working, update the `RELEVANT` list in `interceptor.js`.

## License

[MIT](LICENSE) — do whatever, no warranty.
