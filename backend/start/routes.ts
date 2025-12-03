/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController =()=>import ('#Controllers/Http/auth_controller') from '../app/Controllers/Http/auth_controller.js'

router.post('/register', [AuthController, 'register'])

