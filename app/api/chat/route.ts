import { openai } from "@ai-sdk/openai"
import { streamText, convertToCoreMessages } from "ai"
import type { NextRequest } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages, id, model: selectedModel } = await req.json()

    // Convert messages to the format expected by the AI SDK
    const coreMessages = convertToCoreMessages(messages)

    let modelInstance;
    modelInstance = openai.chat("deepseek-chat", { baseURL: "https://api.deepseek.com/chat" });

    const result = await streamText({
      model: modelInstance,
      messages: coreMessages,
      system:
        "You are Rihman AI, a helpful and intelligent assistant. Provide clear, accurate, and helpful responses to user queries.",
      maxTokens: 5000,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}


