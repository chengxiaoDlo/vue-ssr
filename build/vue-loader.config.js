'use strict'
const utils = require('./utils')
const isPro = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isPro ? true : false

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isPro
  }),
  cssSourceMap: sourceMapEnabled,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
