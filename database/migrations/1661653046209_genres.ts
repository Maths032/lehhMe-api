import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'genres'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      //
      table.uuid('genre_uuid').unique()
      // "id": "b16e21785bcdd2394b3e2a77de0f8eaa",
      table.increments('genre_id').primary()
      // "name": "action",
      table.string('name').notNullable()
      // "title": "Ação"
      table.string('title').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
