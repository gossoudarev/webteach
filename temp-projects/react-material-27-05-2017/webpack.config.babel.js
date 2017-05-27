/*jshint esversion: 6 */

import webpack from 'webpack';
import { isProd } from './src/shared/util';

const WDS_PORT = 8765;

export default {
  entry: [
    './src/client/'
  ],
  output: {
    filename: './js/bundle.js',
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },  
  devServer: {
    port: WDS_PORT
  }
};
