module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      "/": {
        page: "/",
      },
    };
  },
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};
