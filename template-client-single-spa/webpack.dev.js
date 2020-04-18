/* eslint-env node */
const config = require('./webpack.config.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerPort: 8888,
  })
);
config.devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/app/_SINGLE_SPA_APP_/': {
      target: 'http://localhost:4006',
      pathRewrite: { '^/app/_SINGLE_SPA_APP_': '' },
    },
  },
};

config.mode = 'development';

module.exports = config;
