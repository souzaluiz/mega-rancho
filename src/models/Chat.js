const { Schema, model } = require('mongoose')

const Chat = new Schema({
  chatId: Number
})

module.exports = model('chat', Chat)