// app/api/ai/summarize/route.ts
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

    const { projectId } = await request.json()

    // Get project data
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
            assignee: true,
          },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a project management AI assistant. Analyze the project data and generate a concise weekly summary highlighting:
          - Overall progress and completion rate
          - Key accomplishments
          - Tasks that need attention
          - Potential risks or delays
          - Recommendations for the coming week`
        },
        {
          role: "user",
          content: `Generate a weekly summary for project: ${project.name}
          
          Project Details:
          - Description: ${project.description}
          - Status: ${project.status}
          - Start Date: ${project.startDate}
          - End Date: ${project.endDate}
          
          Tasks:
          ${project.tasks.map(task => `
            - ${task.title} (${task.status}): ${task.description}
            Priority: ${task.priority}, Due: ${task.dueDate}
            Subtasks: ${task.subtasks.length} completed
          `).join('\n')}`
        }
      ],
    })

    const summary = completion.choices[0].message.content

    // Save the insight
    await prisma.aIInsight.create({
      data: {
        type: 'PROGRESS_UPDATE',
        content: summary || 'No summary generated',
        projectId,
        data: {
          generatedAt: new Date().toISOString(),
          tasksCount: project.tasks.length,
          completedTasks: project.tasks.filter(t => t.status === 'DONE').length,
        },
      },
    })

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('AI summarization failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}