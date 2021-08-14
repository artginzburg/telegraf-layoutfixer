export interface Config {
  /**
   * Sets whether the bot should suggest fixes for commands that are not shown when the user starts typing `/`
   *
   * @default false
   */
  allowUnlistedCommands?: boolean;

  /**
   * Sets a RegEx for validating layout-converted message as a command. Allows only words by default (a-z, A-Z, 0-9, _)
   *
   * @default /^\w+$/
   */
  validator?: RegExp;

  /**
   * Defines the first symbol of a message that tells layoutfixer the text should be interpreted as a command.
   *
   * @default ['/', '.', '?', '÷', '\\', '|', '«', '»']
   */
  validInitiators?: string[];

  /**
   * Sets the commands that count as listed (if `allowUnlistedCommands` is `false`). Gets the bot's currently specified commands by default.
   *
   * @default undefined
   */
  commands?: object;
}

declare function layoutfixer(config?: Config);

export = layoutfixer;
