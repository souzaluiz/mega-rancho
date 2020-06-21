require('dotenv/config')
const TelegramBot = require('node-telegram-bot-api')
const Chat = require('./models/Chat')

const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

  const [exists] = await Chat.find()

  if(exists) {
    await Chat.findByIdAndUpdate(exists._id, {chatId})
  } else {
    await Chat.create({chatId})
  }

  bot.sendMessage(chatId, 'Chat cadastrado no sistema!')
})

module.exports = bot