const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "it", "es"],
  },
  localePath: path.resolve('./public/locales')
}