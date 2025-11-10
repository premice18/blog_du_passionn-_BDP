import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Article from './article.js'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare articleId: number

  @column()
  declare filePath: string

  @column()
  declare fileName: string

  @column()
  declare fileType: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>
}
