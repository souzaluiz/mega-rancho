require('dotenv/config')
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id

  fs.writeFile('chatId.txt', chatId, () => {
    bot.sendMessage(chatId, 'Cadastrado no sistema!')
  })
})

module.exports = bot