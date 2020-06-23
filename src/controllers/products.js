const Product = require('../models/Product')

module.exports = {
  async index (req, res) {
    let { page } = req.query

    page = page || 1
    const limit = 10
    const skip = (page - 1) * limit

    const products = await Product.find()
      .limit(limit)
      .skip(skip)

    return res.send(products)
  },

  async store (req, res) {
    const { filename } = req.file
    const { name, price } = req.body

    const data = {
      name,
      price,
      image: filename
    }

    Product.create(data)
      .then(() => {
        return res.redirect('/')
      })
      .catch(err => {
        return res.status(400).send(err)
      })
  },

  async destroy(req, res) {
    const { id } = req.params

    Product.findByIdAndDelete(id)
      .then(() => {
        return res.status(200).send()
      })
      .catch((err) => {
        return res.status(400).send(err)
      })
  },
}