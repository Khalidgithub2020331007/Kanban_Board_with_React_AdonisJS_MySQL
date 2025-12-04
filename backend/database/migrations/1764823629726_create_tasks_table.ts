import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable('tasks', (table) => {
      table.increments('id')
      table
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('title')
      table.text('description')
      table.enum('status', ['todo', 'in_progress', 'testing', 'complete']).defaultTo('todo')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
