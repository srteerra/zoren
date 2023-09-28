const path = require('path');

module.exports = {
  i18n: {
    locales: ["de", "en", "es", "fr", "pt"],
    defaultLocale: "en",
  },
  localePath: path.resolve('./public/locales'),
  debug: true,
};
