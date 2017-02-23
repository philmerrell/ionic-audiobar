var webpack = require('webpack');
var helpers = require('./config/helpers');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: helpers.root('./src/audiobar.module.ts'),

  output: {
      path: helpers.root('dist'),
      publicPath: '/',
      filename: 'audiobar.umd.js',
      library: 'ionic-audiobar',
      libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devtool: 'source-map',

  externals: {
    'ionic-angular': true,
    '@angular/core': true,
    '@angular/common': true
  },

  module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [{
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          } , 'angular2-template-loader']
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['raw-loader', 'sass-loader']
        }
      ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new CleanWebpackPlugin(['dist'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    })
  ]
};