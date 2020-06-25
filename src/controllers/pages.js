const Product = require('../models/Product')

module.exports = {
  async home (req, res) {
    const limit = 10
    const totalProducts = await Product.countDocuments()
    const totalPages = Math.ceil(totalProducts / limit)

    const products = await Product.find()
      .limit(limit)
    
    return res.render('products', {products, totalPages})
  },

  async cart (req, res) {
    return res.render('cart')
  },

  async checkout (req, res) {
    return res.render('checkout')
  },

  async dashboard (req, res) {
    const limit = 10
    const totalProducts = await Product.countDocuments()
    const totalPages = Math.ceil(totalProducts / limit)

    return res.render('dashboard', {totalPages})
  },

  async newProduct (req, res) {
    return res.render('new_product')
  },

  async editProduct (req, res) {
    const { id } = req.params
    const product = await Product.findById(id)

    return res.render('edit_product', {product})
  }
}