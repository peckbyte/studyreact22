const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig,{
    target:'node',
    entry:{
        app: path.join(__dirname,'../client/server-entry.js')
    },
  externals: Object.keys(require('../package').dependencies),
  output:{
        filename: 'server-entry.js',
        libraryTarget:'commonjs2'
    },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://0.0.0.0:3333"'
    })
  ]
})
