import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

const TaskController = () => import('#controllers/tasks_controller')

import { middleware } from '#start/kernel'

router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'store'])
router.post('/auth/logout', [AuthController, 'destroy']).use(middleware.auth())
router.get('/auth/me', [AuthController, 'me']).use(middleware.auth())

router.get('/tasks', [TaskController, 'index']).use(middleware.auth())
router.post('/tasks', [TaskController, 'store']).use(middleware.auth())

router.post('/tasks/move-right', [TaskController, 'moveRight']).use(middleware.auth())
router.post('/tasks/move-left', [TaskController, 'moveLeft']).use(middleware.auth())

router.delete('/tasks', [TaskController, 'destroy']).use(middleware.auth())
