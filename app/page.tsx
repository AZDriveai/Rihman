"use client"

import { useState, useEffect } from "react"
import { Chat } from "@/components/chat"
import { Button } from "@/components/ui/button"
import { IconLogo } from "@/components/ui/icons"
import { MessageSquare, Sparkles } from "lucide-react"
import type { Model } from "@/lib/types/models"

export default function HomePage() {
  const [showChat, setShowChat] = useState(false)
  const [chatId] = useState(() => `chat-${Date.now()}`)
  const [models, setModels] = useState<Model[]>([])

  // Load models from default-models.json
  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await fetch("/default-models.json")
        const data = await response.json()
        setModels(data.models || [])
      } catch (error) {
        console.error("Failed to load models:", error)
        setModels([])
      }
    }
    loadModels()
  }, [])

  if (showChat) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-14 items-center px-4">
              <div className="flex items-center gap-2">
                <IconLogo className="h-6 w-6 text-primary" />
                <span className="font-semibold">Rihman AI</span>
              </div>
              <div className="ml-auto">
                <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                  Back to Home
                </Button>
              </div>
            </div>
          </header>

          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <Chat id={chatId} savedMessages={[]} models={models} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 p-4 rounded-full bg-primary/10 border border-primary/20">
              <IconLogo className="h-12 w-12 text-primary" />
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">Rihman AI</h1>
                <p className="text-sm text-muted-foreground">Intelligent Chat Assistant</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Chat Assistant
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience intelligent conversations with advanced AI models. Get help with coding, writing, analysis, and
              more.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setShowChat(true)}
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Chatting
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-muted/50 transition-all duration-200 bg-transparent"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Conversations</h3>
            <p className="text-muted-foreground">
              Engage in natural, context-aware conversations with advanced AI models that understand your needs.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">DeepSeek AI Model</h3>
            <p className="text-muted-foreground">
              Powered by DeepSeek V3, providing intelligent and accurate responses for all your needs.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <IconLogo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Powerful Tools</h3>
            <p className="text-muted-foreground">
              Access advanced features like code analysis, document processing, and intelligent search capabilities.
            </p>
          </div>
        </div>

        {/* Quick Start Examples */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Try These Examples</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Help me debug this JavaScript code",
              "Explain quantum computing in simple terms",
              "Write a professional email template",
              "Analyze this data and provide insights",
            ].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto text-left justify-start hover:bg-muted/50 transition-colors bg-transparent"
                onClick={() => setShowChat(true)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{example}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
