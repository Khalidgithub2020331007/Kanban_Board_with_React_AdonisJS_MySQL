import Task from '#models/task'
import { HttpContext } from '@adonisjs/core/http'
export default class TasksController {
  public async index({ auth }: HttpContext) {
    return Task.query().where('user_id', auth.user!.id)
  }
  public async store({ request, auth }: HttpContext) {
    const { title, description, status } = request.only(['title', 'description', 'status'])
    return Task.create({
      title,
      description,
      status: status,
      userID=auth.user!.id
    })
  }
}
