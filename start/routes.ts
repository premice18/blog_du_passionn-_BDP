import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const adminController = () => import('#controllers/admin_controller')
const articlesController = () => import('#controllers/articles_controller')

router.on('/').render('pages/home')

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
router
  .get('/admin/articles/create', [adminController, 'pageArticle'])
  .as('createArticle')
  .use(middleware.auth()) // page pour creer un article

router.post('/admin/create/articles', [articlesController, 'createArticle']).use(middleware.auth())
