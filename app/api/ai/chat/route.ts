import { type NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { OpenAI } from 'openai'

// Initialize Gemini AI
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

// Initialize OpenAI as fallback
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, conversationHistory } = await request.json()

    if (!message || !message.trim()) {
      return Response.json({ error: 'Message is required' }, { status: 400 })
    }

    // Build conversation context
    const systemContext = `You are an AI assistant for a project management application. You help users with:
- Creating and organizing tasks
- Setting priorities and deadlines
- Breaking down complex projects into manageable tasks
- Providing productivity tips
- Answering questions about task management
- Suggesting improvements to workflow

Be helpful, concise, and professional. If asked about tasks, projects, or deadlines, provide actionable advice.`

    let aiResponse = ''

    // Try Gemini AI first if available
    if (genAI && process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) // Using flash model which has better quota

        // Build the full prompt with conversation history
        let fullPrompt = systemContext + '\n\n'
        
        if (conversationHistory && conversationHistory.length > 0) {
          fullPrompt += 'Previous conversation:\n'
          conversationHistory.forEach((msg: { role: string; content: string }) => {
            fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
          })
          fullPrompt += '\n'
        }
        
        fullPrompt += `User: ${message}\nAssistant:`

        const result = await model.generateContent(fullPrompt)
        const response = await result.response
        aiResponse = response.text()

      } catch (geminiError) {
        console.error('Gemini AI error, falling back to OpenAI:', geminiError)
        
        // Fall back to OpenAI if Gemini fails
        if (openai) {
          const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: systemContext }
          ]

          if (conversationHistory && conversationHistory.length > 0) {
            conversationHistory.forEach((msg: { role: string; content: string }) => {
              messages.push({
                role: msg.role as 'user' | 'assistant',
                content: msg.content
              })
            })
          }

          messages.push({ role: 'user', content: message })

          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 500,
          })

          aiResponse = completion.choices[0].message.content || 'I apologize, but I could not generate a response.'
        } else {
          throw new Error('Both Gemini and OpenAI are unavailable')
        }
      }
    } else if (openai) {
      // Use OpenAI if Gemini is not configured
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemContext }
      ]

      if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach((msg: { role: string; content: string }) => {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          })
        })
      }

      messages.push({ role: 'user', content: message })

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
      })

      aiResponse = completion.choices[0].message.content || 'I apologize, but I could not generate a response.'
    } else {
      return Response.json({ 
        error: 'No AI service configured',
        response: 'I apologize, but the AI service is not properly configured. Please contact the administrator to set up either the Gemini API key or OpenAI API key.'
      }, { status: 500 })
    }

    return Response.json({ 
      response: aiResponse,
      success: true 
    })

  } catch (error) {
    console.error('AI chat error:', error)
    
    // Handle specific errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    if (errorMessage.includes('RATE_LIMIT_EXCEEDED') || errorMessage.includes('429')) {
      return Response.json({ 
        error: 'Rate limit exceeded',
        response: 'I apologize, but the AI service is currently experiencing high demand. Please try again in a moment.'
      }, { status: 429 })
    }
    
    if (errorMessage.includes('API key')) {
      return Response.json({ 
        error: 'Invalid API key',
        response: 'The AI service is experiencing configuration issues. Please contact support.'
      }, { status: 500 })
    }
    
    return Response.json({ 
      error: 'Failed to generate response',
      response: 'I apologize, but I encountered an error processing your request. Please try again.'
    }, { status: 500 })
  }
}
