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
      status,
      userid: auth.user!.id,
    })
  }
  public async destroy({ params, auth }: HttpContext) {
    const task = await Task.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()
    await task.delete()
    return { success: true }
  }
}
