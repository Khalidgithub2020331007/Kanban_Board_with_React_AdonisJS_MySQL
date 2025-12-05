import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  public async getAllUsers({ response }: HttpContext) {
    try {
      const users = await User.query().select('id', 'name', 'email')
      return response.ok({ users })
    } catch (error) {
      return response.internalServerError({
        messages: 'Failed to fetch users',
        error: error.message,
      })
    }
  }
}
