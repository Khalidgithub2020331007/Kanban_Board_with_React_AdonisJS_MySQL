import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async register({ request }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    return {
      message: 'User registered successfully',
      user,
    }
  }

  public async login({ request, auth }: HttpContext) {
    const { email, password } = request.all()
    const token = await auth.use('api').attempt(email, password)
    return {
      message: 'Login successful',
      token,
    }
  }

  public async logout({ auth }: HttpContext) {
    await auth.use('api').revoke()
    return {
      message: 'Logout successful',
      success: true,
    }
  }

  public async me({ auth }: HttpContext) {
    return {
      message: 'Current logged in user',
      user: auth.user,
    }
  }
}
