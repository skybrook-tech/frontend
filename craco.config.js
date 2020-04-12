const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@core": "./src/modules/core",
          "@ui": "./src/modules/core/ui"
        }
      }
    }
  ]
};
