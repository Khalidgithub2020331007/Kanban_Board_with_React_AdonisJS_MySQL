import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

const TaskController = () => import('#controllers/tasks_controller')
// import router from '@adonisjs/core/services/router'
// import AuthController from '#controllers/auth_controller'
// import TaskController from '#controllers/task_controller'
import { middleware } from '#start/kernel'

// Auth
router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'login']) // <-- must match method name
router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/auth/me', [AuthController, 'me']).use(middleware.auth())

// Tasks
router.get('/tasks', [TaskController, 'index']).use(middleware.auth())
router.post('/tasks', [TaskController, 'store']).use(middleware.auth())
router.post('/tasks/:taskId/move-right', [TaskController, 'moveRight']).use(middleware.auth())
router.post('/tasks/:taskId/move-left', [TaskController, 'moveLeft']).use(middleware.auth())
router.delete('/tasks/:taskId', [TaskController, 'destroy']).use(middleware.auth())
