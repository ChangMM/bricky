var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: 'register.html',
      inject: true,
      chunks:['register']
    }),
    new HtmlWebpackPlugin({
      filename: 'registered.html',
      template: 'registered.html',
      inject: true,
      chunks:['registered']
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'main.html',
      inject: true,
      chunks:['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'new.html',
      template: 'new.html',
      inject: true,
      chunks:['new']
    }),
    new HtmlWebpackPlugin({
        filename: 'annoucement.html',
        template: 'annoucement.html',
        inject: true,
        chunks:['annoucement']
      })
  ]
})
