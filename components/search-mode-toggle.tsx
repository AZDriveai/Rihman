"use client"

import { useState } from "react"
import { Search, MessageSquare } from "lucide-react"
import { Button } from "./ui/button"

interface SearchModeToggleProps {
  initialMode?: "chat" | "search"
  onModeChange?: (mode: "chat" | "search") => void
}

export function SearchModeToggle({ initialMode = "chat", onModeChange }: SearchModeToggleProps) {
  const [mode, setMode] = useState<"chat" | "search">(initialMode)

  const handleToggle = () => {
    const newMode = mode === "chat" ? "search" : "chat"
    setMode(newMode)
    onModeChange?.(newMode)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleToggle} className="flex items-center gap-2 bg-transparent">
      {mode === "chat" ? (
        <>
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
        </>
      ) : (
        <>
          <Search className="h-4 w-4" />
          <span>Search</span>
        </>
      )}
    </Button>
  )
}
