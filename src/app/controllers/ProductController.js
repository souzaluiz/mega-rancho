import path from 'path'
import fs from 'fs/promises'
import VMasker from 'vanilla-masker'

import Product from '../models/Product'
import StorageService from '../services/StorageService'
import { cleanPrice } from './helpers/cleanPrice'

class ProductController {
  async store (req, res) {
    const { filename, path } = req.file
    const { name, price } = req.body

    try {
      const { imageId, imageUrl } = await StorageService.save(path, filename)

      const data = {
        name,
        price: cleanPrice(price),
        imageId,
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
    const { name } = req.body
    const price = Number(VMasker.toNumber(req.body.price))

    if (req.file) {
      // Salvar nova imagem
    } else {
      await Product.findByIdAndUpdate(id, { name, price })
      return res.redirect('/admin-dashboard')
    }

    // if (req.file) {
    //   const { filename } = req.file
    //   const product = await Product.findById(id)
    //   const imagePath = path.resolve(__dirname, '..', '..', 'uploads', product.image)

    //   const data = {
    //     name,
    //     price,
    //     image: filename
    //   }

    //   try {
    //     fs.unlinkSync(imagePath)
    //     await Product.findByIdAndUpdate(id, data)
    //     return res.redirect('/dashboard')
    //   } catch (error) {
    //     return res.send('falha ao atualizar')
    //   }
    // }
  }
}

export default new ProductController()
