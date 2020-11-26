require('dotenv/config')
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const mongoose = require('mongoose')
// require('./telegram')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3333

app.set('view engine', 'njk')

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

nunjucks.configure(path.resolve(__dirname, 'app', 'view'), {
  express: app,
  noCache: true,
  autoescape: false,
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(express.urlencoded({extended: true}))

app.use(routes)

app.listen(PORT)