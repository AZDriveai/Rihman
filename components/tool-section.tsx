"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface ToolSectionProps {
  tool: {
    state: "call" | "result"
    toolCallId: string
    toolName: string
    args?: any
    result?: any
  }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  addToolResult?: (params: { toolCallId: string; result: any }) => void
}

export function ToolSection({ tool, isOpen, onOpenChange, addToolResult }: ToolSectionProps) {
  const [isExecuting, setIsExecuting] = useState(false)

  const handleExecute = async () => {
    if (!addToolResult) return

    setIsExecuting(true)
    try {
      // Simulate tool execution - in a real app, this would call the actual tool
      const mockResult = {
        success: true,
        data: `Tool ${tool.toolName} executed with args: ${JSON.stringify(tool.args)}`,
        timestamp: new Date().toISOString(),
      }

      addToolResult({
        toolCallId: tool.toolCallId,
        result: mockResult,
      })
    } catch (error) {
      console.error("Tool execution failed:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Button variant="ghost" className="w-full justify-between p-4 h-auto" onClick={() => onOpenChange(!isOpen)}>
        <div className="flex items-center gap-2">
          <div
            className={cn("w-2 h-2 rounded-full", {
              "bg-yellow-500": tool.state === "call",
              "bg-green-500": tool.state === "result",
            })}
          />
          <span className="font-medium">{tool.toolName}</span>
          <span className="text-sm text-muted-foreground">{tool.state === "call" ? "Pending" : "Completed"}</span>
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="border-t p-4 space-y-4">
          {/* Tool Arguments */}
          {tool.args && (
            <div>
              <h4 className="font-medium text-sm mb-2">Arguments:</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{JSON.stringify(tool.args, null, 2)}</pre>
            </div>
          )}

          {/* Tool Result */}
          {tool.state === "result" && tool.result && (
            <div>
              <h4 className="font-medium text-sm mb-2">Result:</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{JSON.stringify(tool.result, null, 2)}</pre>
            </div>
          )}

          {/* Execute Button for pending tools */}
          {tool.state === "call" && addToolResult && (
            <div className="flex justify-end">
              <Button size="sm" onClick={handleExecute} disabled={isExecuting}>
                {isExecuting ? "Executing..." : "Execute Tool"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
