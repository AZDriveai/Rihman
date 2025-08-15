import { streamText, convertToCoreMessages } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const deepseek = createOpenAI({
  name: "deepseek",
  apiKey: process.env.DEEPSEEK_API_KEY || "sk-placeholder",
  baseURL: "https://api.deepseek.com/v1",
})

export async function POST(req: NextRequest) {
  try {
    const { messages, id } = await req.json()

    // Convert messages to the format expected by the AI SDK
    const coreMessages = convertToCoreMessages(messages)

    const result = await streamText({
      model: deepseek("deepseek-chat"),
      messages: coreMessages,
      system:
        "You are Rihman AI, a helpful and intelligent assistant powered by DeepSeek. Provide clear, accurate, and helpful responses to user queries.",
      maxTokens: 5000,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
