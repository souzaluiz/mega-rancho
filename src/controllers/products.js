const knex = require('../database/connection')
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async index (req, res) {
    let { page } = req.query

    page = page || 1
    const limit = 12
    const offset = (page - 1) * limit

    const products = await knex('products')
      .select('*')
      .limit(limit)
      .offset(offset)

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
      return res.status(400).send(error)
    }
  },

  async destroy(req, res) {
    const { id } = req.params

    try {
      await knex('products').delete().where({id})
      return res.send('Deletou')
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}