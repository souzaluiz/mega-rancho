const knex = require('knex')
const config = require('../../knexfile')

module.exports = connection = knex(config)