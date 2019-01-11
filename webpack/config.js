/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const basePath = '/'

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${9000}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../src/index'),
  ],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: basePath,
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'src',
      'node_modules',
    ],
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(basePath),
    }),
  ],

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory'],
      include: [
        path.resolve(__dirname, '../src'),
      ],
    }],
  },

  performance: {
    hints: false,
  },
}
