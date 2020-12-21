import { Schema, model } from 'mongoose'

const Chat = new Schema({
  chatId: Number
})

export default model('chat', Chat)
