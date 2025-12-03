/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TasksController = () => import('#controllers/tasks_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
// import AuthController from '../app/
const AuthController = () => import('#controllers/auth_controller')

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.get('/tasks', [TasksController, 'index'])
    router.post('/tasks', [TasksController, 'store'])
    router.delete('/task/:id', [TasksController, 'destroy'])
  })
  .use(middleware.auth())
