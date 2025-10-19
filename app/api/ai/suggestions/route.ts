import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { taskId } = await request.json()

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
      include: {
        subtasks: true,
        project: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a project management AI assistant. Analyze tasks and provide smart suggestions for:
          - Breaking down complex tasks into subtasks
          - Adjusting deadlines based on workload
          - Priority recommendations
          - Resource allocation suggestions`
        },
        {
          role: "user",
          content: `Analyze this task and provide suggestions:
          
          Task: ${task.title}
          Description: ${task.description}
          Current Priority: ${task.priority}
          Due Date: ${task.dueDate}
          Estimated Hours: ${task.estimatedHours}
          Current Subtasks: ${task.subtasks.map(st => `${st.title} (${st.completed ? 'completed' : 'pending'})`).join(', ')}
          
          Please provide actionable suggestions.`
        }
      ],
    })

    const suggestions = completion.choices[0].message.content

    // Save the suggestion
    await prisma.aISuggestion.create({
      data: {
        type: 'SUBTASK_BREAKDOWN',
        content: suggestions || 'No suggestions generated',
        taskId,
        data: {
          generatedAt: new Date().toISOString(),
          model: 'gpt-4',
        },
      },
    })

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('AI suggestions failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}