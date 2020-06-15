exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.decimal('price').notNullable()
    table.string('image').notNullable()
    table.datetime('created_at').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('products')
}