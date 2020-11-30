import path from 'path'
import fs from 'fs/promises'

import Product from '../models/Product'
import StorageService from '../services/StorageService'
import { cleanPrice } from './helpers/convertMoney'

class ProductController {
  async index (req, res) {
    let { page } = req.query

    page = page || 1
    const limit = 10
    const skip = (page - 1) * limit

    const products = await Product.find()
      .limit(limit)
      .skip(skip)

    return res.send(products)
  }

  async store (req, res) {
    const { filename, path } = req.file
    const { name, price } = req.body

    try {
      const { imageName, imageUrl } = await StorageService.save(path, filename)

      const data = {
        name,
        price: cleanPrice(price),
        imageName,
        imageUrl
      }

      await Product.create(data)

      return res.redirect('/new-product')
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async destroy (req, res) {
    const { id } = req.params

    try {
      const product = await Product.findById(id)
      const pathImage = path.resolve(__dirname, '..', '..', 'uploads', product.image)

      fs.access(pathImage, fs.constants.F_OK, async (err) => {
        if (!err) {
          fs.unlinkSync(pathImage)
          await Product.findByIdAndDelete(id)
          return res.status(200).send()
        } else {
          await Product.findByIdAndDelete(id)
          return res.status(200).send()
        }
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async update (req, res) {
    const { id } = req.params
    const { name, price } = req.body

    if (req.file) {
      const { filename } = req.file
      const product = await Product.findById(id)
      const imagePath = path.resolve(__dirname, '..', '..', 'uploads', product.image)

      const data = {
        name,
        price,
        image: filename
      }

      try {
        fs.unlinkSync(imagePath)
        await Product.findByIdAndUpdate(id, data)
        return res.redirect('/dashboard')
      } catch (error) {
        return res.send('falha ao atualizar')
      }
    } else {
      const data = {
        name,
        price
      }

      Product.findByIdAndUpdate(id, data)
        .then(() => {
          return res.redirect('/dashboard')
        })
        .catch(err => {
          return res.status(400).send(err)
        })
    }
  }
}

export default new ProductController()
