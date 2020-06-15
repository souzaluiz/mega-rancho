const knex = require('../database/connection')
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async index (req, res) {
    const products = await knex('products').select('*')
    return res.send(products)
  },

  async store (req, res) {
    const { originalname } = req.file
    const { name, price } = req.body

    const data = {
      id: uuidv4(),
      name,
      price,
      image: originalname,
      created_at: new Date()
    }

    try {
      await knex('products').insert(data)
      return res.send()
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }
}