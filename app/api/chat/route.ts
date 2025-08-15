import { openai } from "@ai-sdk/openai"
import { streamText, convertToCoreMessages } from "ai"
import type { NextRequest } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages, id } = await req.json()

    // Convert messages to the format expected by the AI SDK
    const coreMessages = convertToCoreMessages(messages)

    // Default to GPT-4o for now - in a real app, this would be configurable
    const model = openai("gpt-4o")

    const result = await streamText({
      model,
      messages: coreMessages,
      system:
        "You are Rihman AI, a helpful and intelligent assistant. Provide clear, accurate, and helpful responses to user queries.",
      maxTokens: 4000,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
