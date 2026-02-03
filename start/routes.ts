import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const adminController = () => import('#controllers/admin_controller')
const articlesController = () => import('#controllers/articles_controller')
const messagesController = () => import('#controllers/messages_controller')
const uploadsController = () => import('#controllers/uploads_controller')

router.get('/', [articlesController, 'home']).as('home')
router.get('/search', [articlesController, 'search']).as('search')
router.get('/article/:id', [articlesController, 'showPublicArticle']).as('article.show')

router.get('/uploads/:fileName', [uploadsController, 'show'])

router.get('/contact', [messagesController, 'index']).as('contact')
router.post('/contact', [messagesController, 'store']).as('contact.store')

// Gestion de l'admin
router.get('/admin', [adminController, 'index'])
router.get('/admin/signin', [adminController, 'showSigninForm'])
router.get('/admin/register', [adminController, 'showRegisterForm'])
router.post('/create/admin', [adminController, 'createAdmin']) // creer un nouvel admin
router.post('/admin/login', [adminController, 'loginAdmin']) // connecter l'admin
router
  .get('/admin/dashboard', [adminController, 'dashboard'])
  .as('dashboard')
  .use(middleware.auth())
router.post('/admin/logout', [adminController, 'logout']).use(middleware.auth())

// Gestion des articles
router
  .get('/admin/articles', ({ response }) => {
    return response.redirect().toRoute('dashboard')
  })
  .use(middleware.auth())

router
  .get('/admin/articles/create', [adminController, 'pageArticle'])
  .as('createArticle')
  .use(middleware.auth()) // page pour creer un article

router.post('/admin/create/articles', [articlesController, 'createArticle']).use(middleware.auth()) // Creer un article
router
  .post('/admin/articles/:id/delete', [articlesController, 'deleteArticle'])
  .as('deleteArticle')
  .use(middleware.auth()) // supprimer un article

router.get('/admin/articles/:id/edit', [articlesController, 'editArticle']).use(middleware.auth()) // modifier l'article
router
  .post('/admin/articles/:id/update', [articlesController, 'storeUpdate'])
  .as('updateArticle')
  .use(middleware.auth())

router
  .get('/admin/articles/:id', [articlesController, 'showArticle'])
  .as('showArticle')
  .use(middleware.auth())

router.get('/article/:id/like', [articlesController, 'likeArticle']).as('likeArticle')

// Admin Messages
router
  .get('/admin/messages', [messagesController, 'adminIndex'])
  .as('admin.messages')
  .use(middleware.auth())

router
  .delete('/admin/messages/:id', [messagesController, 'delete'])
  .as('admin.messages.delete')
  .use(middleware.auth())
