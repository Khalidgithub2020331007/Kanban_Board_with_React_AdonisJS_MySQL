import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

const validStatuses = ['todo', 'in_progress', 'testing', 'complete'] as const
type StatusType = (typeof validStatuses)[number]

export default class TaskController {
  // ========================
  // Create a new task
  // ========================
  public async store({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.unauthorized({ message: 'Not authenticated' })

      const { title, description, assigned_person } = request.only([
        'title',
        'description',
        'assigned_person',
      ])

      const task = await Task.create({
        title,
        description,
        status: 'todo' as StatusType,
        userId: user.id,
        assigned_person,
      })

      return response.ok({ message: 'Task created', task })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create task',
        error: error.message,
      })
    }
  }

  // ========================
  // List all tasks for logged-in user
  // ========================
  public async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.unauthorized({ message: 'Not authenticated' })

      const tasks = await Task.query().where('userId', user.id)
      return response.ok({ message: 'User tasks fetched', tasks })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch tasks',
        error: error.message,
      })
    }
  }

  // ========================
  // Move task right (next phase)
  // ========================
  public async moveRight({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.unauthorized({ message: 'Not authenticated' })

      const { taskId } = request.only(['taskId'])
      const task = await Task.query().where('id', taskId).andWhere('userId', user.id).firstOrFail()

      const currentIndex = validStatuses.indexOf(task.status)
      if (currentIndex < validStatuses.length - 1) {
        task.status = validStatuses[currentIndex + 1]
        await task.save()
      }

      return response.ok({ message: 'Task moved right', task })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to move task', error: error.message })
    }
  }

  // ========================
  // Move task left (previous phase)
  // ========================
  public async moveLeft({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.unauthorized({ message: 'Not authenticated' })

      const { taskId } = request.only(['taskId'])
      const task = await Task.query().where('id', taskId).andWhere('userId', user.id).firstOrFail()

      const currentIndex = validStatuses.indexOf(task.status)
      if (currentIndex > 0) {
        task.status = validStatuses[currentIndex - 1]
        await task.save()
      }

      return response.ok({ message: 'Task moved left', task })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to move task', error: error.message })
    }
  }

  // ========================
  // Delete task
  // ========================
  public async destroy({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.unauthorized({ message: 'Not authenticated' })

      const { taskId } = request.only(['taskId'])
      const task = await Task.query().where('id', taskId).andWhere('userId', user.id).firstOrFail()

      await task.delete()
      return response.ok({ message: 'Task deleted' })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to delete task',
        error: error.message,
      })
    }
  }
}
