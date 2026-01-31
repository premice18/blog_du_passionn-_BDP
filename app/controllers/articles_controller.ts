import Article from '#models/article'
import Media from '#models/media'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ArticlesController {
  public async createArticle({ request, response, auth, session }: HttpContext) {
    const user = auth.use('web').user!
    const title = request.input('title')
    const resume = request.input('resume')
    const media1 = request.file('image', {
      size: '20mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const category = request.input('category')
    const content = request.input('content')
    const status = request.input('status', 'published')

    const article = await Article.create({
      title,
      content,
      resume,
      category,
      status,
      userId: user.id,
    })

    if (media1) {
      const fileName = `${cuid()}.${media1.extname}`
      const filePath = `uploads/${fileName}`
      await media1.move(app.publicPath('uploads'), {
        name: fileName,
      })

      await Media.create({
        filePath,
        fileName,
        fileType: media1.extname!,
        articleId: article.id,
      })
    }

    session.flash('notification', {
      type: 'success',
      message: 'Article créé avec succès !',
    })
    return response.redirect().toRoute('dashboard')
  }

  public async deleteArticle({ params, response, session }: HttpContext) {
    const id = params.id
    const article = await Article.findOrFail(id)
    await article.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Article supprimé avec succès !',
    })
    return response.redirect().back()
  }

  public async editArticle({ params, view, auth }: HttpContext) {
    const user = auth.use('web').user
    const article = await Article.query().where('id', params.id).preload('medias').firstOrFail()
    return view.render('pages/admin/edit-article', { article, user })
  }

  public async showArticle({ params, view, auth }: HttpContext) {
    const user = auth.use('web').user
    const article = await Article.query()
      .where('id', params.id)
      .preload('medias')
      .preload('user')
      .firstOrFail()
    return view.render('pages/admin/show-article', { article, user })
  }

  public async storeUpdate({ params, response, request, session }: HttpContext) {
    const article = await Article.findOrFail(params.id)

    // Récupération manuelle des données
    const title = request.input('title')
    const resume = request.input('resume')
    const category = request.input('category')
    const content = request.input('content')
    const status = request.input('status')

    console.log(`--- MISE À JOUR ARTICLE ${params.id} ---`)
    console.log('Titre reçu:', title)
    console.log('Statut reçu:', status)

    // Assignation explicite
    article.title = title
    article.resume = resume
    article.category = category
    article.content = content
    article.status = status

    // Sauvegarde forcée
    await article.save()

    // On rafraîchit l'instance pour être sûr d'avoir ce qu'il y a en DB
    await article.refresh()

    const media1 = request.file('image', {
      size: '20mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (media1) {
      await article.load('medias')
      if (article.medias.length > 0) {
        await article.medias[0].delete()
      }

      const fileName = `${cuid()}.${media1.extname}`
      const filePath = `uploads/${fileName}`
      await media1.move(app.publicPath('uploads'), {
        name: fileName,
      })

      await Media.create({
        filePath,
        fileName,
        fileType: media1.extname!,
        articleId: article.id,
      })
    }

    session.flash('notification', {
      type: 'success',
      message: `L'article "${article.title}" a été mis à jour avec succès !`,
    })

    return response.redirect().toRoute('dashboard')
  }

  public async home({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const category = request.input('category')
    const limit = 6

    const query = Article.query()
      .where('status', 'published')
      .preload('medias')
      .orderBy('created_at', 'desc')

    if (category) {
      query.where('category', category.toLowerCase())
    }

    const articles = await query.paginate(page, limit)

    // Ajout du paramètre de catégorie aux liens de pagination si présent
    if (category) {
      articles.baseUrl('/').queryString({ category })
    }

    const pages = Array.from({ length: articles.lastPage }, (_, i) => i + 1)

    return view.render('pages/home', { articles, currentCategory: category, pages })
  }

  public async search({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const q = request.input('q')
    const limit = 6

    if (!q) {
      return view.render('pages/search', { articles: [], q: '', pages: [] })
    }

    const articles = await Article.query()
      .where('status', 'published')
      .where((query) => {
        query
          .whereILike('title', `%${q}%`)
          .orWhereILike('content', `%${q}%`)
          .orWhereILike('resume', `%${q}%`)
      })
      .preload('medias')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    articles.baseUrl('/search').queryString({ q })

    const pages = Array.from({ length: articles.lastPage }, (_, i) => i + 1)

    return view.render('pages/search', { articles, q, pages })
  }

  public async showPublicArticle({ params, view }: HttpContext) {
    const article = await Article.query()
      .where('id', params.id)
      .where('status', 'published')
      .preload('medias')
      .preload('user')
      .firstOrFail()

    // Incrémenter les vues
    article.views += 1
    await article.save()

    // Chercher des articles reliés (même catégorie)
    const relatedArticles = await Article.query()
      .where('category', article.category)
      .whereNot('id', article.id)
      .where('status', 'published')
      .preload('medias')
      .limit(3)

    return view.render('pages/show-article', { article, articles: relatedArticles })
  }
  public async likeArticle({ params, response }: HttpContext) {
    const article = await Article.findOrFail(params.id)

    article.like_count += 1
    await article.save()

    return response.redirect().back()
  }
}
