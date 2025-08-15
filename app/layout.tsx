import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ArtifactProvider } from "@/components/artifact/artifact-context"
import { ArtifactPanel } from "@/components/artifact/artifact-panel"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Rihman AI Chat",
  description: "AI Chat powered by DeepSeek",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body>
        <ArtifactProvider>
          {children}
          <ArtifactPanel />
        </ArtifactProvider>
      </body>
    </html>
  )
}
