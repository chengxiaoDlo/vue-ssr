const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new VueSSRPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})