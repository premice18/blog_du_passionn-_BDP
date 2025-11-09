import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const adminController = () => import('#controllers/admin_controller')

router.on('/').render('pages/home')

// Gestion de l'admin
router.get('/admin', [adminController, 'index'])
router.get('/admin/signin', [adminController, 'showSigninForm'])
router.get('/admin/register', [adminController, 'showRegisterForm'])
router.post('/create/admin', [adminController, 'createAdmin'])
router.post('/admin/login', [adminController, 'loginAdmin'])
router.get('/dashboard', [adminController, 'dashboard']).as('dashboard').use(middleware.auth())
router.post('/logout', [adminController, 'logout']).use(middleware.auth())
router
  .get('/admin/articles/create', [adminController, 'createArticle'])
  .as('createArticle')
  .use(middleware.auth())
