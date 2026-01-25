import Article from '#models/article'
import User from '#models/user'
import Message from '#models/message'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  public async index({ view }: HttpContext) {
    return view.render('pages/admin/login')
  }
  public async showSigninForm({ view }: HttpContext) {
    return view.render('pages/admin/signin')
  }
  public async showRegisterForm({ view }: HttpContext) {
    return view.render('pages/admin/register')
  }
  public async createAdmin({ request, view }: HttpContext) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.create({
        fullName: name,
        email,
        password,
        role: 'admin',
      })

      return view.render('pages/admin/register-success', { user })
    } catch (error) {
      return error
    }
  }
  public async loginAdmin({ request, response, auth }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      return 'Mot de passe ou email incorrect'
    }
  }
  public async dashboard({ view, auth }: HttpContext) {
    const user = auth.use('web').user
    const articles = await Article.query().preload('medias').orderBy('created_at', 'desc')
    const messagesCount = await Message.query().from('messages').count('* as total').first()

    const publishedCount = articles.filter((a) => a.status === 'published').length
    const draftCount = articles.filter((a) => a.status === 'draft').length
    const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0)

    return view.render('pages/admin/dashboard', {
      user,
      articles,
      publishedCount,
      draftCount,
      totalViews,
      messagesCount: messagesCount?.$extras.total || 0,
    })
  }
  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
  public async pageArticle({ view, auth }: HttpContext) {
    const user = auth.use('web').user
    return view.render('pages/admin/create-article', { user })
  }
}
