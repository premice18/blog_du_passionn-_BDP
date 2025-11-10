import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Media from './media.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare userId: number

  @column()
  declare resume: string | null

  @column()
  declare category: string

  @column()
  declare like_count: string

  @column()
  declare comment_count: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Media, {
    foreignKey: 'articleId',
  })
  declare media: relations.HasMany<typeof Media>
}
