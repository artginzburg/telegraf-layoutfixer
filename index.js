const { Composer } = require('telegraf');

const ru = require('convert-layout/ru');
// const cyrillicToTranslit = require('cyrillic-to-translit-js')();

const defaultConfig = require('./defaultConfig');

module.exports = function layoutfixer(config) {
  // generate new config object based on defaultConfig and override it with existing variables in the config passed as argument
  config = { ...defaultConfig, ...config };

  return Composer.on('text', (ctx, next) => {
    // Terms:
    // layout-converted message — (e.g. `рудз` => `help`)
    // transliterated message — (e.g. `админ` => `admin`)
    const { chat, message, telegram } = ctx;

    // Get bot commands and add to the variable
    !config.commands &&
      !config.allowUnlistedCommands &&
      telegram.getMyCommands().then((data) => {
        config.commands = data;
      });

    if (!chat || chat.type !== 'private') {
      // bypass if chat is not private or doesn't exist
      return next();
    }

    if (!message || !message.text) {
      // bypass if message doesn't exist or doesn't contain text
      return next();
    }

    // if (message.entities && message.entities.some((entity) => entity.type === 'bot_command')) {
    //   // bypass if the message is syntactically valid as a command (Telegram's built-in validation)
    //   return next();
    // }

    const initSymbol = message.text[0];

    if (!config.validInitiators.includes(initSymbol)) {
      // bypass if the message wasn't intended to be a command
      return next();
    }

    const textWithoutInit = message.text.substring(1);

    // if (initSymbol === '/') {
    //   const translitConverted = cyrillicToTranslit.transform(message.text);
    //   // reply with transliterated message if the initial message was surely a command
    //   return ctx.reply(`${translitConverted}?`);
    // }

    // layout-convert the initial message
    const layoutConverted = ru.toEn(textWithoutInit);

    if (layoutConverted === textWithoutInit) {
      // bypass if layout-converted message equals the initial message
      return next();
    }

    if (!config.validator.test(layoutConverted)) {
      // bypass if layout-converted message is not valid
      return next();
    }

    if (config.commands && !config.allowUnlistedCommands) {
      const commandIsListed = config.commands.some((obj) => obj.command.includes(layoutConverted));
      if (!commandIsListed) {
        // bypass if unlisted commands are not allowed, commands exist, and the command in message is listed
        // doesn't work on the first call because ctx.telegram.getMyCommands() is async
        return next();
      }
    }

    // reply with layout-converted message
    return ctx.reply(`/${layoutConverted}?`);
  });
};
