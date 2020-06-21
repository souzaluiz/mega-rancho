const { Schema, model } = require('mongoose')

const Product = new Schema({
  name: String,
  price: Number,
  image: String,
}, {
  timestamps: true
})

module.exports = model('product', Product)