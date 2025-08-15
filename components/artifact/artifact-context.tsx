"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Artifact {
  id: string
  type: "code" | "document" | "image" | "chart" | "component"
  title: string
  content: string
  language?: string
  createdAt: Date
  updatedAt: Date
}

interface ArtifactContextType {
  artifacts: Artifact[]
  currentArtifact: Artifact | null
  isOpen: boolean
  addArtifact: (artifact: Omit<Artifact, "id" | "createdAt" | "updatedAt">) => void
  updateArtifact: (id: string, updates: Partial<Artifact>) => void
  removeArtifact: (id: string) => void
  openArtifact: (id: string) => void
  close: () => void
  open: () => void
}

const ArtifactContext = createContext<ArtifactContextType | undefined>(undefined)

export function ArtifactProvider({ children }: { children: ReactNode }) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [currentArtifact, setCurrentArtifact] = useState<Artifact | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const addArtifact = (artifactData: Omit<Artifact, "id" | "createdAt" | "updatedAt">) => {
    const newArtifact: Artifact = {
      ...artifactData,
      id: `artifact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setArtifacts((prev) => [...prev, newArtifact])
    setCurrentArtifact(newArtifact)
    setIsOpen(true)
  }

  const updateArtifact = (id: string, updates: Partial<Artifact>) => {
    setArtifacts((prev) =>
      prev.map((artifact) => (artifact.id === id ? { ...artifact, ...updates, updatedAt: new Date() } : artifact)),
    )

    if (currentArtifact?.id === id) {
      setCurrentArtifact((prev) => (prev ? { ...prev, ...updates, updatedAt: new Date() } : null))
    }
  }

  const removeArtifact = (id: string) => {
    setArtifacts((prev) => prev.filter((artifact) => artifact.id !== id))
    if (currentArtifact?.id === id) {
      setCurrentArtifact(null)
      setIsOpen(false)
    }
  }

  const openArtifact = (id: string) => {
    const artifact = artifacts.find((a) => a.id === id)
    if (artifact) {
      setCurrentArtifact(artifact)
      setIsOpen(true)
    }
  }

  const close = () => {
    setIsOpen(false)
    setCurrentArtifact(null)
  }

  const open = () => {
    setIsOpen(true)
  }

  return (
    <ArtifactContext.Provider
      value={{
        artifacts,
        currentArtifact,
        isOpen,
        addArtifact,
        updateArtifact,
        removeArtifact,
        openArtifact,
        close,
        open,
      }}
    >
      {children}
    </ArtifactContext.Provider>
  )
}

export function useArtifact() {
  const context = useContext(ArtifactContext)
  if (context === undefined) {
    throw new Error("useArtifact must be used within an ArtifactProvider")
  }
  return context
}

export type { Artifact }
