import type { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  public async createArticle({ request }: HttpContext) {
    const title = request.input('title')
    const resume = request.input('resume')
    const media = request.file('image', {
      size: '20mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const category = request.input('category')
    const content = request.input('content')

    return { title, resume, media, category, content }
  }
}
