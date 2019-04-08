// tslint:disable no-implicit-dependencies

import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

function transformManifest(content: string): string {
  const manifest = JSON.parse(content);

  const packageData = require('./package.json');

  manifest.name = packageData.productName;
  manifest.description = packageData.description;
  manifest.version = packageData.version;
  manifest.author = packageData.author;
  manifest.homepage_url = packageData.repository;

  if (process.env.BROWSER === 'chrome') {
    manifest.permissions.push('activeTab', 'https://gloapi.gitkraken.com/*');
    delete manifest.browser_specific_settings;
  } else {
    manifest.permissions.push('<all_urls>');
    delete manifest.key;
  }

  return JSON.stringify(manifest, null, 2);
}

const config: webpack.Configuration = {
  entry: {
    background: path.resolve(__dirname, 'src/background.ts'),
    content: path.resolve(__dirname, 'src/content.ts'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
      {
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('postcss-preset-env')()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
        test: /\.s?css$/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets/manifest.json'),
        to: path.resolve(__dirname, 'build'),
        transform: transformManifest,
      },
      {
        from: path.resolve(__dirname, 'icons'),
        to: path.resolve(__dirname, 'build/icons'),
      },
      {
        from: path.resolve(__dirname, 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'),
        to: path.resolve(__dirname, 'build/js'),
      },
      {
        from: path.resolve(__dirname, 'LICENSE'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};

export default config;
