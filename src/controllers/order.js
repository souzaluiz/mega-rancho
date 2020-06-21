const telegram = require('../telegram')
const path = require('path')
const { formatMessage } = require('../utils')
const { seed } = require('../database/connection')
const fs = require('fs').promises

module.exports = {
  async create(req, res) {
    const data = req.body
    const chatId = await fs.readFile(path.resolve(__dirname, '..', '..', 'chatId.txt'), 'utf-8')
    
    const message = formatMessage(data)
    
    try {
      telegram.sendMessage(chatId, message)
      return res.status(200).send()      
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}