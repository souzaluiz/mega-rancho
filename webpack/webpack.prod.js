const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '..', 'scripts'),
  entry: {
    cart: './cart.js',
    checkout: './checkout.js',
    dashboard: './dashboard.js',
    loader: './loader.js',
    products: './products.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin,
    new MinifyPlugin({}, {
      comments: false
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'public', 'js')
  },
}