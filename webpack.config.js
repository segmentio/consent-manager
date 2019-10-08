const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/standalone.tsx',
  output: {
    path: path.join(__dirname, 'standalone'),
    filename: 'consent-manager.js',
    library: 'consentManager'
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      lodash: 'lodash-es'
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
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
