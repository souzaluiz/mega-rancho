
module.exports = {
  mode: 'production',
  entry: {
    loader: './scripts/loader.js',
    products: './scripts/products.js',
    cart: './scripts/cart.js',
    checkout: './scripts/checkout.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/js'
  },
  target: 'web',
}