// tslint:disable no-implicit-dependencies

import * as CopyWebpackPlugin from 'copy-webpack-plugin';
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

  return JSON.stringify(manifest, null, 2);
}

const config: webpack.Configuration = {
  entry: {
    background: path.resolve(__dirname, 'src/background/index.ts'),
    content: path.resolve(__dirname, 'src/content/index.ts'),
    options: path.resolve(__dirname, 'src/options/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/js'),
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static/manifest.json'),
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
        from: path.resolve(__dirname, 'src/options/index.html'),
        to: path.resolve(__dirname, 'build/options.html'),
      },
      {
        from: path.resolve(__dirname, 'LICENSE'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
  ],
};

export default config;
