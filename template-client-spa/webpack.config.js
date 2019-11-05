const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const publicPath = '/app/%SINGLE_SPA_APP%/';

module.exports = {
  entry: path.resolve(__dirname, 'src/root.ts'),
  output: {
    filename: '%SINGLE_SPA_APP%.[hash].js',
    library: '%SINGLE_SPA_APP%',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  mode: 'production',
  optimization: {
    moduleIds: 'hashed',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.js?$/,
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader',
          },
          // Split out otherwise performance is really poor
          {
            test: /\.(ts|tsx)?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            exclude: [/\.(js|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: 'manifest',
      filter: (fd) => fd.name === 'main.js',
      serialize: (manifest) =>
        JSON.stringify(
          {
            js: [manifest['main.js']],
            publicPath,
          },
          null,
          2
        ),
    }),
  ],
  devtool: 'source-map',
  externals: [
    /^@portal\/*/,
    /^lodash$/,
    /^single-spa$/,
    /^rxjs\/?.*$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
  ],
};
