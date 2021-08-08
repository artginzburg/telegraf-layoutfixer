# telegraf-layoutfixer

[![Dependencies](https://status.david-dm.org/gh/artginzburg/telegraf-layoutfixer.svg)](https://david-dm.org/artginzburg/telegraf-layoutfixer)

Suggests layout typo fixes in Telegram chats. (e.g. `.рудз` => `/help`)

## Quick start

First, run `npm i telegraf-layoutfixer`. Then, in your Telegraf app:

```js
const { Telegraf } = require('telegraf');
const layoutfixer = require('telegraf-layoutfixer');

const bot = new Telegraf(process.env.BOT_TOKEN)

// ...

bot.use(layoutfixer());

bot.launch()
```

> layoutfixer should be connected last, after all the other middlewares

## Preview

<img width="300" alt="preview" src="misc/preview.jpg">

## Options

[Defaults](https://github.com/artginzburg/telegraf-layoutfixer/blob/main/defaultConfig.js) are shown below:

```js
require('telegraf-layoutfixer')({
  allowUnlistedCommands: false,
  validator: /^\w+$/,
  validInitiators: ['/', '.', '?', '÷', '\\', '|', '«', '»'],
  commands: undefined,
});
```

### allowUnlistedCommands (_default: false_)

Sets whether the bot should suggest fixes for commands that are not shown when the user starts typing `/`

### validator (_default: /^\w+$/_)

Sets a RegEx for validating layout-converted message as a command. Allows only words by default (a-z, A-Z, 0-9, _)

### validInitiators (_default: ['/', '.', '?', '÷', '\\', '|', '«', '»']_)

Defines the first symbol of a message that tells layoutfixer the text should be interpreted as a command.

### commands (_default: ctx.telegram.getMyCommands()_)

Sets the commands that count as listed (if `allowUnlistedCommands` is `false`). Gets the bot's currently specified commands by default.
