import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Genre from 'App/Models/Genre'

export default class GenresController {
  public async list({ request, response }: HttpContextContract) {
    const filterGenresSchema = schema.create({
      genreId: schema.number.optional(),
    })

    const { genreId } = await request.validate({ schema: filterGenresSchema })

    const genres = await Genre.filterGenres({ genreId })

    response.status(200).json({
      status: 'success',
      message: 'Listando gêneros.',
      data: {
        genres,
      },
    })
  }
}
