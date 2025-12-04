import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AuthAccessTokens extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tokenable_id').notNullable()
      table.string('tokenable_type').notNullable()
      table.string('name').nullable()
      table.string('hash', 255).notNullable() // <-- MUST be 'hash'
      table.json('abilities').notNullable()
      table.timestamp('expires_at').nullable()
      table.timestamp('last_used_at').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
