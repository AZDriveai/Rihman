"use client"

import { useArtifact } from "./artifact-context"
import { ArtifactViewer } from "./artifact-viewer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X, FileText, Code, ImageIcon, BarChart3, Component } from "lucide-react"
import { cn } from "@/lib/utils"

const typeIcons = {
  code: Code,
  document: FileText,
  image: ImageIcon,
  chart: BarChart3,
  component: Component,
}

export function ArtifactPanel() {
  const { artifacts, currentArtifact, isOpen, close, openArtifact } = useArtifact()

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-background border-l shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Artifacts</h2>
        <Button variant="ghost" size="sm" onClick={close} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        {artifacts.length > 1 && (
          <div className="w-64 border-r bg-muted/30">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {artifacts.map((artifact) => {
                  const Icon = typeIcons[artifact.type] || FileText
                  return (
                    <Button
                      key={artifact.id}
                      variant={currentArtifact?.id === artifact.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-auto p-3 text-left",
                        currentArtifact?.id === artifact.id && "bg-secondary",
                      )}
                      onClick={() => openArtifact(artifact.id)}
                    >
                      <div className="flex items-start gap-2 w-full">
                        <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{artifact.title}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {artifact.type}
                            </Badge>
                            {artifact.language && (
                              <Badge variant="outline" className="text-xs">
                                {artifact.language}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {currentArtifact ? (
            <ArtifactViewer artifact={currentArtifact} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No artifact selected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
