"use client"

import { useState } from "react"
import type { Message } from "ai"
import type { ChatRequestOptions } from "ai"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { IconUser, IconAssistant, IconCopy, IconCheck, IconEdit, IconRefresh } from "./ui/icons"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface RenderMessageProps {
  message: Message
  messageId: string
  getIsOpen: (id: string) => boolean
  onOpenChange: (id: string, open: boolean) => void
  onQuerySelect: (query: string) => void
  chatId?: string
  addToolResult?: (params: { toolCallId: string; result: any }) => void
  onUpdateMessage?: (messageId: string, newContent: string) => Promise<void>
  reload?: (messageId: string, options?: ChatRequestOptions) => Promise<string | null | undefined>
}

export function RenderMessage({
  message,
  messageId,
  getIsOpen,
  onOpenChange,
  onQuerySelect,
  chatId,
  addToolResult,
  onUpdateMessage,
  reload,
}: RenderMessageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content as string)
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const handleCopy = () => {
    copyToClipboard(message.content as string)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(message.content as string)
  }

  const handleSaveEdit = async () => {
    if (onUpdateMessage && editContent !== message.content) {
      await onUpdateMessage(messageId, editContent)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(message.content as string)
  }

  const handleReload = async () => {
    if (reload) {
      await reload(messageId)
    }
  }

  return (
    <div
      className={cn("group relative flex items-start gap-4 p-4 rounded-lg", {
        "bg-muted/50": message.role === "assistant",
      })}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={cn("flex h-8 w-8 items-center justify-center rounded-full", {
            "bg-primary text-primary-foreground": message.role === "user",
            "bg-muted text-muted-foreground": message.role === "assistant",
          })}
        >
          {message.role === "user" ? <IconUser /> : <IconAssistant />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        )}

        {/* Tool calls rendering */}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className="space-y-2">
            {message.toolInvocations.map((toolInvocation) => (
              <div key={toolInvocation.toolCallId} className="border rounded-lg p-3 bg-muted/30">
                <div className="font-medium text-sm mb-2">Tool: {toolInvocation.toolName}</div>
                {toolInvocation.state === "call" && (
                  <div className="text-sm text-muted-foreground">
                    Calling with args: {JSON.stringify(toolInvocation.args, null, 2)}
                  </div>
                )}
                {toolInvocation.state === "result" && (
                  <div className="text-sm">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(toolInvocation.result, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={handleCopy} className="h-8 w-8 p-0">
            {isCopied ? <IconCheck /> : <IconCopy />}
          </Button>
          {message.role === "user" && onUpdateMessage && (
            <Button size="sm" variant="ghost" onClick={handleEdit} className="h-8 w-8 p-0">
              <IconEdit />
            </Button>
          )}
          {message.role === "assistant" && reload && (
            <Button size="sm" variant="ghost" onClick={handleReload} className="h-8 w-8 p-0">
              <IconRefresh />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
