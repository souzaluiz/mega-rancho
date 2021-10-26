import { Schema, model } from 'mongoose'

const Product = new Schema({
  name: String,
  price: Number,
  imageId: String,
  imageUrl: String
}, {
  timestamps: true
})

export default model('product', Product)
