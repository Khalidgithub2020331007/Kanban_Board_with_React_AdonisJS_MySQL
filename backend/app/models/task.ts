import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare title: string

  @column()
  declare description: string
  @column()
  declare status: 'todo' | 'in-progress' | 'testing' | 'complete'

  @column()
  declare userid: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
