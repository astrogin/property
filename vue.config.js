const webpack = require('webpack');

module.exports = {
  outputDir: '../public/cli-dist',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
  },
};
