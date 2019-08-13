module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        if (process.env.NODE_ENV === 'development') {
          return {
            ...options,
            prettify: false,
          };
        }
        return options;
      });
  },
};
