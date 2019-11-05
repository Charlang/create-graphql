const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/common-deps.ts',
  output: {
    filename: 'common-deps.js',
    path: path.resolve(__dirname, 'dist/common-deps'),
    chunkFilename: '[name].js',
  },
  mode: 'production',
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  devtool: 'sourcemap',
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        parser: {
          System: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
