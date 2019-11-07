const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/register.ts',
  output: {
    filename: 'register.js',
    library: 'register',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        parser: {
          System: false,
        },
      },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/index.html') },
      // { from: path.resolve(__dirname, 'src/fonts'), to: 'fonts' },
    ]),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [/^lodash$/, /^single-spa$/, /^rxjs\/?.*$/],
};
