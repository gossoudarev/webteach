/*jshint esversion: 6 */

import path from 'path';
import webpack from 'webpack';
import { isProd } from './src/shared/util';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const WDS_PORT = 9999;

export default {
  entry: [
    './src/client/',
  ],
  output: {
    filename: './js/bundle.js',
    
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }) }
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new ExtractTextPlugin({
      filename:  'css/main.css',
      disable: false,
      allChunks: true
    })
  ],
  
  devServer: {
    port: WDS_PORT
  }
};
