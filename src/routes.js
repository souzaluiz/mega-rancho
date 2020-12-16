import express from 'express'

import ProductController from './app/controllers/ProductController'
import OrderController from './app/controllers/OrderController'
import PagesController from './app/controllers/PagesController'

import upload from './config/multer'
import sharp from './config/sharp'

const routes = express.Router()

// Pages
routes.get('/', PagesController.products)
routes.get('/new-product', PagesController.newProduct)
routes.get('/shooping-cart', PagesController.shoopingCart)
routes.get('/checkout', PagesController.checkout)
routes.get('/order-result', PagesController.orderResult)

routes.get('/dashboard', PagesController.dashboard)
routes.get('/edit-product/:id', PagesController.editProduct)

// CRUD
routes.post('/products', upload.single('image'), sharp.resizing, ProductController.store)

routes.post('/order', OrderController.store)

routes.get('/products', ProductController.index)
routes.delete('/products/:id', ProductController.destroy)
routes.post('/edit/:id', upload.single('image'), sharp.resizing, ProductController.update)

export default routes
