import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // {
      //   imdbID: '1',
      table.increments('book_id')
      table.uuid('book_uuid').unique()
      //   Genre_id: 1,
      table.integer('genre_id').notNullable().unsigned().references('genres.genre_id')
      //   Poster: 'https://images-na.ssl-images-amazon.com/images/I/91g-rulrh4L.jpg',
      table.string('poster').notNullable()
      //   Year: '2014',
      table.string('year').notNullable()
      //   Title: 'Quatro: histórias da série Divergente',
      table.string('title').notNullable()
      //   resume: 'Um resumo do livro aqui como um pop-up do charkaui',
      table.string('resume').notNullable()
      //   Ratings: [
      //     {
      //       Value: '9.6/10',
      //     },
      //   ],
      table.json('ratings').notNullable()
      // },]

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
