import { type NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
        assignee: true,
        subtasks: true,
      },
      orderBy: {
        position: 'asc',
      },
    })

    return Response.json(tasks)
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return Response.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, projectId, status, priority, dueDate, estimatedHours } = body

    // Get the highest position in the current status column
    const lastTask = await prisma.task.findFirst({
      where: {
        userId,
        status: status || 'TODO',
      },
      orderBy: {
        position: 'desc',
      },
    })

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'TODO',
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours,
        position: lastTask ? lastTask.position + 1 : 0,
        userId,
        projectId,
      },
      include: {
        project: true,
        assignee: true,
        subtasks: true,
      },
    })

    return Response.json(newTask)
  } catch (error) {
    console.error('Failed to create task:', error)
    return Response.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}