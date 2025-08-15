"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import type { Model } from "@/lib/types/models"

interface ModelSelectorProps {
  models: Model[]
  selectedModel?: string
  onModelChange?: (modelId: string) => void
}

export function ModelSelector({ models, selectedModel, onModelChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)

  const currentModel = models.find((model) => model.id === selectedModel) || models[0]

  const handleSelect = (modelId: string) => {
    onModelChange?.(modelId)
    setOpen(false)
  }

  if (models.length === 0) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-transparent"
          size="sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="truncate">{currentModel?.name || "Select model..."}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No models found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem key={model.id} value={model.id} onSelect={() => handleSelect(model.id)}>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={cn("w-2 h-2 rounded-full", {
                        "bg-green-500": model.enabled,
                        "bg-gray-400": !model.enabled,
                      })}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{model.name}</span>
                      <span className="text-xs text-muted-foreground">{model.provider}</span>
                    </div>
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", {
                      "opacity-100": currentModel?.id === model.id,
                      "opacity-0": currentModel?.id !== model.id,
                    })}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
