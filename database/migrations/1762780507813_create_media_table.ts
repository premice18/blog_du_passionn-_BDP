import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('article_id')
        .unsigned()
        .references('id')
        .inTable('articles')
        .onDelete('CASCADE')
      table.string('file_path')
      table.string('file_name')
      table.string('file_type')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
