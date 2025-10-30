import { type NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, status, priority, dueDate, estimatedHours, position } = body

    const task = await prisma.task.update({
      where: {
        id: params.id,
        userId,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(estimatedHours && { estimatedHours }),
        ...(position && { position }),
      },
      include: {
        project: true,
        assignee: true,
        subtasks: true,
      },
    })

    return Response.json(task)
  } catch (error) {
    console.error('Failed to update task:', error)
    return Response.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.task.delete({
      where: {
        id: params.id,
        userId,
      },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Failed to delete task:', error)
    return Response.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}