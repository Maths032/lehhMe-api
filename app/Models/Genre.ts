import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Genre extends BaseModel {
  @column()
  public genreUuid: string

  @column({ isPrimary: true })
  public genreId: number

  @column()
  public name: string

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async uuid(genre: Genre) {
    // if (auth.$dirty.password) {
    if (!genre?.genreUuid || genre?.genreUuid === '') {
      genre.genreUuid = uuidv4()
    }
    // }
  }

  public static async filterGenres({ genreId }: { genreId?: number }) {
    return new Promise(async (resolve, reject) => {
      try {
        const genres = await Genre.query().where('genreId', 'LIKE', `%${genreId ? genreId : ''}%`)

        resolve(genres)
      } catch (error) {
        reject(error)
      }
    })
  }
}
