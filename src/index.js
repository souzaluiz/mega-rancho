const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3333

app.set('view engine', 'njk')

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

nunjucks.configure(path.resolve(__dirname, 'view'), {
  express: app,
  noCache: true,
  autoescape: false
})

app.use(routes)

app.listen(PORT)