"use client"

import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { toPng, toSvg } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Settings } from "@/components/settings"
import { TemplateSelector, templates } from "@/components/template-selector"
import { useTheme } from "@/components/theme-provider"
import { Download, Settings2, Layout } from "lucide-react"

export default function Home() {
  const [markdown, setMarkdown] = useState(
    "# Hello, World!\n\nThis is a **Markdown** to _HTML_ converter.\n\n- List item 1\n- List item 2\n\n## Features\n\n1. Real-time preview\n2. Customizable settings\n3. Export as PNG or SVG",
  )
  const [showSettings, setShowSettings] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("classic")
  const [settings, setSettings] = useState({
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    lineHeight: 1.6,
    textColor: "#000000",
    backgroundColor: "#ffffff",
    padding: 20,
  })

  const previewRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0]

  const handleExport = async (type: "png" | "svg") => {
    if (!previewRef.current) return

    try {
      let dataUrl
      if (type === "png") {
        dataUrl = await toPng(previewRef.current, { quality: 0.95 })
      } else {
        dataUrl = await toSvg(previewRef.current)
      }

      const link = document.createElement("a")
      link.download = `markdown-export.${type}`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  // Combine template styles with user settings
  const combinedStyles = {
    ...currentTemplate.styles.container,
    fontSize: `${settings.fontSize}px`,
    color: settings.textColor,
    backgroundColor: settings.backgroundColor,
    padding: `${settings.padding}px`,
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Markdown to HTML Converter</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setShowTemplates(true)
                setShowSettings(false)
              }}
              aria-label="Templates"
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setShowSettings(true)
                setShowTemplates(false)
              }}
              aria-label="Settings"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleExport("png")} aria-label="Export as PNG">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export as PNG</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleExport("svg")} aria-label="Export as SVG">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export as SVG</span>
            </Button>
          </div>
        </div>

        {showSettings && (
          <Settings settings={settings} setSettings={setSettings} onClose={() => setShowSettings(false)} />
        )}

        {showTemplates && (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            onClose={() => setShowTemplates(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden">
            <Textarea
              className="w-full h-[70vh] resize-none p-4 font-mono text-sm border-0 focus-visible:ring-0"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your Markdown here..."
            />
          </div>

          <div ref={previewRef} className="border rounded-lg overflow-auto h-[70vh]" style={combinedStyles}>
            <div className="markdown-content">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 style={currentTemplate.styles.heading} {...props} />,
                  h2: ({ node, ...props }) => <h2 style={currentTemplate.styles.heading} {...props} />,
                  h3: ({ node, ...props }) => <h3 style={currentTemplate.styles.heading} {...props} />,
                  h4: ({ node, ...props }) => <h4 style={currentTemplate.styles.heading} {...props} />,
                  h5: ({ node, ...props }) => <h5 style={currentTemplate.styles.heading} {...props} />,
                  h6: ({ node, ...props }) => <h6 style={currentTemplate.styles.heading} {...props} />,
                  p: ({ node, ...props }) => <p style={currentTemplate.styles.content} {...props} />,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

