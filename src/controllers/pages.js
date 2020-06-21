const knex = require('../database/connection')

module.exports = {
  async home (req, res) {
    const limit = 12
    const [totalProducts] = await knex('products').count('id')
    const totalPages = Math.ceil(totalProducts.count / limit)

    const products = await knex('products')
      .select('*')
      .limit(limit)
      .offset(0)
    
    return res.render('products', {products, totalPages})
  },

  async cart (req, res) {
    return res.render('cart')
  },

  async checkout (req, res) {
    return res.render('checkout')
  }
}