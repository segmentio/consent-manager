const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/standalone.js',
  output: {
    path: path.join(__dirname, 'standalone'),
    filename: 'consent-manager.js',
    library: 'consentManager'
  },
  resolve: {
    alias: {
      react: 'inferno-compat',
      'react-dom': 'inferno-compat',
      lodash: 'lodash-es'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        VERSION: JSON.stringify(pkg.version)
      }
    }),
    new webpack.BannerPlugin(
      `
Consent Manager v${pkg.version}
https://github.com/segmentio/consent-manager
Released under the MIT license
Copyright © 2018, Segment.io, Inc
    `.trim()
    )
  ]
}
