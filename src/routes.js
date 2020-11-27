const express = require('express')
const routes = express.Router()

const products = require('./app/controllers/products')
const order = require('./app/controllers/order')
const PagesController = require('./app/controllers/PagesController')
const upload = require('./config/multer')
const sharp = require('./config/sharp')

// Pages
routes.get('/', PagesController.products)
routes.get('/cart', PagesController.cart)
routes.get('/checkout', PagesController.checkout)
routes.get('/dashboard', PagesController.dashboard)
routes.get('/new-product', PagesController.newProduct)
routes.get('/edit-product/:id', PagesController.editProduct)

// CRUD
routes.get('/products', products.index)
routes.post('/products', upload.single('image'), sharp.resizing, products.store)
routes.delete('/products/:id', products.destroy)
routes.post('/edit/:id', upload.single('image'), sharp.resizing, products.update)
routes.post('/order', order.create)

module.exports = routes
