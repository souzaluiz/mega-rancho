const express = require('express')
const routes = express.Router()

const products = require('./controllers/products')
const order = require('./controllers/order')
const pages = require('./controllers/pages')
const upload = require('./config/multer')
const sharp = require('./config/sharp')

// Pages
routes.get('/', pages.home)
routes.get('/cart', pages.cart)
routes.get('/checkout', pages.checkout)
routes.get('/dashboard', pages.dashboard)
routes.get('/new-product', pages.newProduct)
routes.get('/edit-product/:id', pages.editProduct)

// CRUD
routes.get('/products', products.index)
routes.post('/products', upload.single('image'), sharp.resizing, products.store)
routes.delete('/products/:id', products.destroy)
routes.post('/edit/:id',upload.single('image'), sharp.resizing, products.update)
routes.post('/order', order.create)

module.exports = routes