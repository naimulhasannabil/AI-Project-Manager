import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
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

    const { prompt, projectId } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a project management AI assistant. Generate a structured task breakdown based on the user's prompt. 
          Return a JSON array of tasks with title, description, estimated hours, and priority (LOW, MEDIUM, HIGH, URGENT).`
        },
        {
          role: "user",
          content: `Create a task breakdown for: ${prompt}`
        }
      ],
      response_format: { type: "json_object" }
    })

    const tasks = JSON.parse(completion.choices[0].message.content || '{}').tasks

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('AI task generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate tasks' },
      { status: 500 }
    )
  }
}