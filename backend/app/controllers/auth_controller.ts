import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {

  public async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.query().where('email', email).firstOrFail()

      const passwordVerified = await Hash.verify(user.password, password)
      if (!passwordVerified) {
        return response.unauthorized({ message: 'Invalid credentials' })
      }

      // Create API token
      const accessToken = await auth.use('api').createToken(user)
      return response.ok({
        message: 'Login successful',
        user,
        token: accessToken.toJSON().token, // convert to JSON and get token string
        next: '/board',
      })
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async destroy({ response, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      await auth.use('api').invalidateToken() // revoke current token
      return response.ok({
        message: 'Logged out successfully',
        next: '/login', // frontend route
      })
    } else {
      return response.badRequest({
        message: 'You are not logged in',
      })
    }
  }

  public async me({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Not authenticated' })
    }

    return response.ok({
      message: 'Current logged in user',
      user,
    })
  }

  public async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'password'])

      // Check if email already exists
      const existingUser = await User.query().where('email', data.email).first()
      if (existingUser) {
        return response.badRequest({ message: 'Email already registered' })
      }

      const user = await User.create(data)
      return response.ok({
        message: 'User registered successfully',
        user,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to register user',
        error: error.message,
      })
    }
  }
}
