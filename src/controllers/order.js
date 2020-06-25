const telegram = require('../telegram')
const { formatMessage } = require('../utils')
const Chat = require('../models/Chat')

module.exports = {
  async create(req, res) {
    const data = req.body

    try {
      const [chat] = await Chat.find()
      const message = formatMessage(data)
    
      telegram.sendMessage(chat.chatId, message)
      return res.status(200).send()      
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}