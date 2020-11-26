const Product = require('../../models/Product')
const pagination = require('./helpers/pagination')

class PagesController {
  async products (req, res) {
    const currentPage = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 1)
    
    const skip = (currentPage - 1) * limit

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().limit(limit).skip(skip)
    ])
    
    if(totalProducts === 0) {
      // retorna página vazia
    }   
    
    const totalPages = Math.ceil(totalProducts / limit)

    const pages = []
    for(let page = 1; page <= totalPages; page++) {
      pages.push(`<a href="/?page=${page}">${page}</a>`)
    }

    // 1° Número maximo de paginações
    // 2° Número dos links laterais maximo/2
    // 3° 

    return res.render('products', {products, totalPages, currentPage, pages})
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

    return res.render('dashboard', {totalPages})
  }

  async newProduct (req, res) {
    return res.render('new_product')
  }

  async editProduct (req, res) {
    const { id } = req.params
    const product = await Product.findById(id)

    return res.render('edit_product', {product})
  }
}

module.exports = new PagesController()