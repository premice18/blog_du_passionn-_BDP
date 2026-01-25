import { DateTime } from 'luxon'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Media from './media.js'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'

import User from './user.js'

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
  declare status: 'draft' | 'published'

  @column()
  declare views: number

  @column()
  declare like_count: number

  @column()
  declare comment_count: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Media)
  declare medias: HasMany<typeof Media>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
