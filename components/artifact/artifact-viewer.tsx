"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconCopy, IconCheck } from "@/components/ui/icons"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { X, Download, Edit, Eye } from "lucide-react"
import { useArtifact, type Artifact } from "./artifact-context"

interface ArtifactViewerProps {
  artifact: Artifact
  onClose?: () => void
}

export function ArtifactViewer({ artifact, onClose }: ArtifactViewerProps) {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview")
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const { updateArtifact } = useArtifact()

  const handleCopy = () => {
    copyToClipboard(artifact.content)
  }

  const handleDownload = () => {
    const blob = new Blob([artifact.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${artifact.title.toLowerCase().replace(/\s+/g, "-")}.${getFileExtension(artifact.type, artifact.language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (type: string, language?: string) => {
    if (type === "code") {
      switch (language) {
        case "javascript":
        case "js":
          return "js"
        case "typescript":
        case "ts":
          return "ts"
        case "python":
          return "py"
        case "html":
          return "html"
        case "css":
          return "css"
        case "json":
          return "json"
        default:
          return "txt"
      }
    }
    return "txt"
  }

  const renderPreview = () => {
    switch (artifact.type) {
      case "code":
        return (
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code className={`language-${artifact.language || "text"}`}>{artifact.content}</code>
            </pre>
          </div>
        )
      case "document":
        return (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap">{artifact.content}</div>
          </div>
        )
      case "component":
        return (
          <div className="border rounded-lg p-4 bg-background">
            <div className="text-sm text-muted-foreground mb-2">Component Preview:</div>
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              <code>{artifact.content}</code>
            </pre>
          </div>
        )
      default:
        return <div className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">{artifact.content}</div>
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{artifact.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {artifact.type}
            </Badge>
            {artifact.language && (
              <Badge variant="outline" className="text-xs">
                {artifact.language}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={handleCopy} className="h-8 w-8 p-0">
              {isCopied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDownload} className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "preview" | "code")} className="h-full">
          <div className="px-6 pb-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Source
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="h-full mt-0">
            <ScrollArea className="h-full px-6 pb-6">{renderPreview()}</ScrollArea>
          </TabsContent>

          <TabsContent value="code" className="h-full mt-0">
            <ScrollArea className="h-full px-6 pb-6">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{artifact.content}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
