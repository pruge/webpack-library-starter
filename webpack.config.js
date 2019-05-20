/* global __dirname, require, module*/

const { resolve } = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackSourceMapSupport = require('webpack-source-map-support');

let libraryName = pkg.name;

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: [
    resolve(__dirname + '/core/index.js')
  ],
  // devtool: 'inline-source-map',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  // optimization: {
  //   // node_module을 외부로 뺌으로서 해결
  //   // mysql error: PROTOCOL_INCORRECT_PACKET_SEQUENCE
  //   minimize: false
  // },
  target: 'node',
  node: {
    __dirname: true
    // fs: 'empty' // for browser
  },
  plugins: [
    new WebpackSourceMapSupport(),
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
  externals: [nodeExternals()],
  resolve: {
    'alias': {
      '@core': resolve(__dirname, 'core')
    },
    modules: ['node_modules'],
    extensions: ['.json', '.js']
  }
};

module.exports = config;
