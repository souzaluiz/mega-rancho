const telegram = require('../telegram')
const { formatMessage } = require('../utils')
const Chat = require('../models/Chat')
const Product = require('../models/Product')

module.exports = {
  async create(req, res) {
    const data = req.body

    const ids = data.products.map(item => {
      return item.id
    })

    try {
      const [chat] = await Chat.find()     

      const products = await Product.find()
        .where('_id')
        .in(ids)
      
      const productsWithQuantity = products.map((item, index) => {
          return {
            name: item.name,
            price: item.price,
            quantity: data.products[index].quantity
          }
        })

      data.products = productsWithQuantity
      
      const message = formatMessage(data)
    
      telegram.sendMessage(chat.chatId, message)
      return res.status(200).send()      
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}