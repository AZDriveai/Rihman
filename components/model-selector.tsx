"use client"

import type { Model } from "@/lib/types/models"

interface ModelSelectorProps {
  models: Model[]
  selectedModel?: string
  onModelChange?: (modelId: string) => void
}

export function ModelSelector({ models }: ModelSelectorProps) {
  const currentModel = models[0] // Only one model now

  if (!currentModel) {
    return null
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-input rounded-md">
      <div className="w-2 h-2 rounded-full bg-green-500" />
      <span className="text-sm font-medium">{currentModel.name}</span>
      <span className="text-xs text-muted-foreground">({currentModel.provider})</span>
    </div>
  )
}
