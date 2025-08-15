"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"

interface SearchModeToggleProps {
  // Add any props specific to SearchModeToggle if needed
}

export function SearchModeToggle({}: SearchModeToggleProps) {
  const [open, setOpen] = useState(false)
  const [searchMode, setSearchMode] = useState("web") // Default search mode

  const handleSelect = (mode: string) => {
    setSearchMode(mode)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between bg-transparent"
          size="sm"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">{searchMode === "web" ? "Web Search" : "No Search"}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No search modes found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="web" onSelect={() => handleSelect("web")}>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium">Web Search</span>
                </div>
                <Check
                  className={cn("ml-auto h-4 w-4", {
                    "opacity-100": searchMode === "web",
                    "opacity-0": searchMode !== "web",
                  })}
                />
              </CommandItem>
              <CommandItem value="none" onSelect={() => handleSelect("none")}>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium">No Search</span>
                </div>
                <Check
                  className={cn("ml-auto h-4 w-4", {
                    "opacity-100": searchMode === "none",
                    "opacity-0": searchMode !== "none",
                  })}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
