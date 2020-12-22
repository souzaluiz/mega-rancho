import Product from '../models/Product'

class OrderController {
  async store (req, res) {
    const { name, addres, complement, telephone, products_list } = req.body

    const clientInfo = { name, addres, complement, telephone }
    const productsCart = JSON.parse(products_list)

    const productsIds = productsCart.map(item => item.id)

    try {
      const products = await Product.find()
        .where('_id')
        .in(productsIds)
        .select('_id price name')

      const productsWithQuantity = products.map(item => {
        const [productQuantity] = productsCart.filter(product => product.id === item.id)

        return {
          ...productQuantity,
          name: item.name,
          price: item.price
        }
      })

      return res.render('order-result', { completedOrder: true })
    } catch (error) {
      return res.render('order-result', { completedOrder: false })
    }
  }
}

export default new OrderController()
