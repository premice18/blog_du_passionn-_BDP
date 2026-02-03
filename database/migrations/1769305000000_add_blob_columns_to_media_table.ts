import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.binary('file_blob')
      table.string('mime_type')
      table.integer('file_size')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('file_blob')
      table.dropColumn('mime_type')
      table.dropColumn('file_size')
    })
  }
}
