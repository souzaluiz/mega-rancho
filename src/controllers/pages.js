const knex = require('../database/connection')

module.exports = {
  async home (req, res) {
    const [totalProducts] = await knex('products').count('id')
    const totalPages = Math.ceil(totalProducts.count / 4)

    const products = await knex('products')
      .select('*')
      .limit(4)
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