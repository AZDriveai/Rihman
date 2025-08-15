"use client"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface EmptyScreenProps {
  submitMessage: (message: string) => void
  className?: string
}

const exampleMessages = [
  {
    heading: "Explain technical concepts",
    message: "What is the difference between React Server Components and Client Components?",
  },
  {
    heading: "Help with coding",
    message: "How do I implement authentication in a Next.js app?",
  },
  {
    heading: "Debug an issue",
    message: "My API route is returning a 500 error. Can you help me troubleshoot?",
  },
  {
    heading: "Plan a project",
    message: "What's the best architecture for a real-time chat application?",
  },
]

export function EmptyScreen({ submitMessage, className }: EmptyScreenProps) {
  return (
    <div className={cn("mx-auto max-w-2xl px-4", className)}>
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">Welcome to Rihman AI Chat!</h1>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => submitMessage(message.message)}
            >
              <div className="text-left">
                <div className="font-medium">{message.heading}</div>
                <div className="text-sm text-muted-foreground">{message.message}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
