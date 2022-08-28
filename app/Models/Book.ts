import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public bookId: number

  @column()
  public bookUuid: string

  @column()
  public genreId: number

  @column()
  public poster: string

  @column()
  public year: string

  @column()
  public title: string

  @column()
  public resume: string

  @column()
  public ratings: Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async uuid(book: Book) {
    // if (auth.$dirty.password) {
    if (!book?.bookUuid || book?.bookUuid === '') {
      book.bookUuid = uuidv4()
    }
    // }
  }

  public static async filterBooks({ genreId }: { genreId?: number }) {
    return new Promise(async (resolve, reject) => {
      try {
        const books = await Book.query().where('genreId', 'LIKE', `%${genreId ? genreId : ''}%`)

        resolve(
          // books.map((v) => {
          //   return {
          //     poster: v.poster,
          //     year: v.year,
          //     title: v.title,
          //     resume: v.resume,
          //     ratings: JSON.parse(`${v.ratings}`),
          //     bookId: v.bookId,
          //   }
          // })
          books
        )
      } catch (error) {
        reject(error)
      }
    })
  }
}
