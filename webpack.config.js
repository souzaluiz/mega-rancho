const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'scripts'),
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
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new MinifyPlugin({}, {
      comments: false
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'js')
  },
}