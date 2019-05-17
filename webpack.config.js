/* global __dirname, require, module*/

// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const { resolve } = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');
const Dotenv = require('dotenv-webpack');

let libraryName = pkg.name;

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: [
    resolve(__dirname + '/core/index.js')
  ],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  target: 'node',
  node: {
    __dirname: true
    // fs: 'empty' // for browser
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    'alias': {
      '@core': resolve(__dirname, 'core')
    },
    modules: ['node_modules'],
    extensions: ['.json', '.js']
  }
};

module.exports = config;
