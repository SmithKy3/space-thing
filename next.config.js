const path = require('path');

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': {
        page: '/',
      },
    };
  },
  webpack(config) {
    config.resolve.alias['src'] = path.join(__dirname, 'src');
    config.resolve.alias['common'] = path.join(__dirname, 'src/common');
    config.resolve.alias['components'] = path.join(__dirname, 'src/components');
    config.resolve.alias['engine'] = path.join(__dirname, 'src/engine');
    config.resolve.alias['entities'] = path.join(__dirname, 'src/entities');

    return config;
  },
};
