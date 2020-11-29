import Product from '../../models/Product'
import paginationCreate from './helpers/paginationCreate'

class PagesController {
  async products (req, res) {
    const currentPage = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)

    const skip = (currentPage - 1) * limit

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().limit(limit).skip(skip)
    ])

    const totalPages = Math.ceil(totalProducts / limit)

    const pagination = paginationCreate(currentPage, totalPages)

    if (totalProducts === 0) {
      return res.render('products', {
        products: 0,
        totalPages: 1,
        currentPage: 1,
        pagination: [1]
      })
    }

    return res.render('products', {
      products,
      totalPages,
      currentPage,
      pagination
    })
  }

  async cart (req, res) {
    return res.render('cart')
  }

  async checkout (req, res) {
    return res.render('checkout')
  }

  async dashboard (req, res) {
    const limit = 10
    const totalProducts = await Product.countDocuments()
    const totalPages = Math.ceil(totalProducts / limit)

    return res.render('dashboard', { totalPages })
  }

  async newProduct (req, res) {
    return res.render('new_product')
  }

  async editProduct (req, res) {
    const { id } = req.params
    const product = await Product.findById(id)

    return res.render('edit_product', { product })
  }
}

export default new PagesController()
