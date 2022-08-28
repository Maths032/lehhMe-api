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
  public ratings: string

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
          books.map((v) => {
            const returnObject = v

            returnObject.ratings = JSON.parse(
              v.ratings.slice(1, v.ratings.length - 1).replace(/\'/g, '"')
            )

            return returnObject
          })
          // books
        )
      } catch (error) {
        reject(error)
      }
    })
  }
}
