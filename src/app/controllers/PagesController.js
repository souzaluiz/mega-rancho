import Product from '../models/Product'
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

    if (!totalProducts) {
      return res.render('products', { productsEmpty: true })
    }

    return res.render('products', {
      products,
      totalPages,
      currentPage,
      pagination
    })
  }

  async shoopingCart (req, res) {
    const { products_cart } = req.cookies

    const productsId = products_cart ? JSON.parse(products_cart) : []

    if (!productsId.length) {
      return res.render('cart', { cartEmpty: true })
    }

    const products = await Product
      .find({ _id: { $in: productsId } })
      .select('_id name price imageUrl')

    return res.render('shooping-cart', { products })
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

  async newProduct (_, res) {
    return res.render('new-product')
  }

  async editProduct (req, res) {
    const { id } = req.params
    const product = await Product.findById(id)

    return res.render('edit_product', { product })
  }
}

export default new PagesController()
