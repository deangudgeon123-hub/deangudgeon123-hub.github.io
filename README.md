# Boxed Menu Telegram Mini App

This repository contains a static Telegram Mini App that shows a simple cannabis menu. It runs entirely with plain HTML, CSS and JavaScript so it can be hosted on any static site host.

## Editing products
- All menu data lives in [`data.json`](data.json).
- `categories` hold the list of available sections.
- `items` contain individual products. Each item has:
  - `id`: unique slug used in URLs.
  - `categoryId`: must match one of the category `id`s.
  - `title`, `image`, `description` and `prices` (array of `{label, amount}`).
- Add new products by appending to the `items` array.

Images should be placed in the [`images/`](images) directory. Reference them in `data.json` as `images/your-file.jpg`.

## Deploying
1. Push this repository to GitHub.
2. Create a new project on [Netlify](https://www.netlify.com/).
3. Select this repository and deploy as a static site (no build command needed).
4. Note the deployed URL (e.g. `https://your-site.netlify.app`).

## Connecting to Telegram
1. Create a bot with [@BotFather](https://t.me/BotFather).
2. Use the `setdomain` command in BotFather to allow the Netlify domain.
3. Add a `web_app` button to your bot’s custom keyboard or inline button pointing to the deployed URL.
4. Users can then open the Mini App directly within Telegram.

## Development
The app relies on Telegram's WebApp API. When running outside Telegram it still works as a basic website but without Telegram-specific features.
