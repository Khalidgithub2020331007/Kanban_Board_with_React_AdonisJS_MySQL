import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async register({ request }: HttpContext) {
    const schema = vine.object({
      username: vine.string(),
      email: vine.string().email(),
      password: vine
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    })

    const data = await vine.validate({
      schema,
      data: request.all(),
    })

    const user = await User.create({
      username: data.username,
      email: data.email,
      password: await Hash.make(data.password),
    })

    return {
      message: 'User registered successfully',
      user,
    }
  }

  public async login({ request, auth }: HttpContext) {
    const { email, password } = request.all()
    const token = await auth.use('jwt' as any).attempt(email, password)

    return {
      message: 'Logged in successfully',
      token,
    }
  }

  public async logout({ auth }: HttpContext) {
    await auth.use('jwt' as any).revoke()

    return {
      message: 'Logged out successfully',
    }
  }
}
