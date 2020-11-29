import express from 'express'

import products from './app/controllers/products'
import order from './app/controllers/order'
import PagesController from './app/controllers/PagesController'
import upload from './config/multer'
import sharp from './config/sharp'

const routes = express.Router()

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

export default routes
