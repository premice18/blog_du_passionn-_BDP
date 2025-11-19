import Article from '#models/article'
import Media from '#models/media'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ArticlesController {
  public async createArticle({ request, response }: HttpContext) {
    const title = request.input('title')
    const resume = request.input('resume')
    const media1 = request.file('image', {
      size: '20mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const category = request.input('category')
    const content = request.input('content')

    // sauvegarde de l'article

    const articles = await Article.create({
      title: title,
      content: content,
      resume: resume,
      category: category,
    })

    // sauvegarde de l'image

    if (media1) {
      const fileName = `${cuid()}.${media1?.extname}`
      const filePath = `uploads/${fileName}`
      await media1.move(app.publicPath('uploads'), {
        name: fileName,
      })

      const media = await Media.create({
        filePath: filePath,
        fileName: fileName,
        fileType: media1?.extname,
        articleId: articles.id,
      })
      console.log(media)
    }
    return response.redirect().toRoute('dashboard')
  }
  public async deleteArticle({ params, response }: HttpContext) {
    const id = params.id
    await Article.query().where('id', id).delete()
    return response.redirect().back()
  }

  public async editArticle({ params, view, auth }: HttpContext) {
    const user = auth.use('web').user
    const id = params.id
    const article = await Article.query().where('id', id).preload('medias').firstOrFail()
    return view.render('pages/admin/edit-article', { article, user })
  }

  public async showArticle({ params, view, auth }: HttpContext) {
    const user = auth.use('web').user
    const id = params.id
    const article = await Article.query().where('id', id).preload('medias').firstOrFail()
    return view.render('pages/admin/show-article', { article, user })
  }
}
