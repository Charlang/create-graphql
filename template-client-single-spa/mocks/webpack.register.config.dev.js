/* eslint-env node */
const config = require('./webpack.register.config.js');
const webpack = require('webpack');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  contentBase: './dist',
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/common/': {
      target: 'http://localhost:4005',
      pathRewrite: { '^/common': '' },
    },
    '/app/_SINGLE_SPA_APP_/': {
      target: 'http://localhost:4006',
    },
    '/graphql/_SINGLE_SPA_APP_': {
      target: 'http://localhost:4001/graphql',
      pathRewrite: { '^/_SINGLE_SPA_APP_': '' },
    },
  },
};

config.mode = 'development';

module.exports = config;
