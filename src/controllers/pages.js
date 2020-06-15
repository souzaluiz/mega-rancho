const knex = require('../database/connection')
const { v4: uuidv4 } = require('uuid');
const { checkout } = require('../routes');

module.exports = {
  async home (req, res) {
    const products = await knex('products').select('*')
    
    return res.render('products', {products})
  },

  async cart (req, res) {
    return res.render('cart')
  },

  async checkout (req, res) {
    return res.render('checkout')
  }
}