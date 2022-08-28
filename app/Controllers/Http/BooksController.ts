import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Book from 'App/Models/Book'

export default class BooksController {
  public async list({ request, response }: HttpContextContract) {
    const filterBooksSchema = schema.create({
      genreId: schema.number.optional(),
    })

    const { genreId } = await request.validate({ schema: filterBooksSchema })

    const books = await Book.filterBooks({ genreId })

    response.status(200).json({
      status: 'success',
      message: 'Listando livros.',
      data: {
        books,
      },
    })
  }
}
