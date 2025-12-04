import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
export default class AuthController {
  // ========================
  // Register new user
  // ========================
  public async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'password'])

      // Check if email already exists
      const existingUser = await User.query().where('email', data.email).first()
      if (existingUser) {
        return response.badRequest({ message: 'Email already registered' })
      }

      // Save password as plain text (no hashing)
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

  // ========================
  // Login user
  // ========================
  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      console.log('Trying to login with email:', email)

      // Find user by email
      const user = await User.query().where('email', email).firstOrFail()
      console.log('User found:', user)

      // Verify hashed password
      const passwordVerified = await hash.verify(user.password, password)
      console.log('Password verified:', passwordVerified)

      if (!passwordVerified) {
        return response.unauthorized({ message: 'Invalid credentials' })
      }

      // Create API token
      let accessToken
      try {
        accessToken = await auth.use('api').createToken(user)
        console.log('Access token created:', accessToken.toJSON())
      } catch (err) {
        console.error('Failed to create token:', err)
        return response.internalServerError({
          message: 'Failed to create token',
          error: err.message,
        })
      }

      return response.ok({
        message: 'Login successful',
        user,
        token: accessToken.toJSON().token, // API token string
        next: '/board',
      })
    } catch (err) {
      console.error('Login failed:', err)
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  // ========================
  // Logout
  // ========================
  public async logout({ response, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      await auth.use('api').invalidateToken() // revoke current token
      return response.ok({
        message: 'Logged out successfully',
        next: '/login',
      })
    } else {
      return response.badRequest({ message: 'You are not logged in' })
    }
  }

  // ========================
  // Get current logged-in user
  // ========================
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
}
