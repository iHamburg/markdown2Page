"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export interface Template {
  id: string
  name: string
  description: string
  previewImage: string
  styles: {
    container: React.CSSProperties
    content: React.CSSProperties
    heading: React.CSSProperties
  }
}

export const templates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    description: "A clean, traditional document style with serif fonts",
    previewImage: "/placeholder.svg?height=100&width=150",
    styles: {
      container: {
        fontFamily: "Georgia, serif",
        lineHeight: 1.6,
        color: "#333333",
        backgroundColor: "#ffffff",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "none",
        border: "1px solid #e0e0e0",
      },
      content: {
        fontSize: "16px",
      },
      heading: {
        borderBottom: "1px solid #e0e0e0",
        paddingBottom: "10px",
        marginBottom: "20px",
        color: "#222222",
      },
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with sans-serif fonts and accent colors",
    previewImage: "/placeholder.svg?height=100&width=150",
    styles: {
      container: {
        fontFamily: "Inter, system-ui, sans-serif",
        lineHeight: 1.8,
        color: "#2d3748",
        backgroundColor: "#f7fafc",
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
      },
      content: {
        fontSize: "16px",
      },
      heading: {
        color: "#4a5568",
        fontWeight: 700,
        marginBottom: "24px",
        position: "relative",
        paddingLeft: "12px",
        borderLeft: "4px solid #5a67d8",
      },
    },
  },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  onClose: () => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [localSelection, setLocalSelection] = useState(selectedTemplate)

  const handleApply = () => {
    onSelectTemplate(localSelection)
    onClose()
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Select Template</h3>
        <RadioGroup
          value={localSelection}
          onValueChange={setLocalSelection}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                localSelection === template.id ? "border-primary ring-2 ring-primary/20" : "hover:border-gray-400"
              }`}
              onClick={() => setLocalSelection(template.id)}
            >
              <div className="flex items-start gap-4">
                <div className="hidden md:block">
                  <img
                    src={template.previewImage || "/placeholder.svg"}
                    alt={`${template.name} template preview`}
                    className="w-[150px] h-[100px] object-cover rounded border"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                      <Label htmlFor={template.id} className="text-base font-medium cursor-pointer">
                        {template.name}
                      </Label>
                    </div>
                    {localSelection === template.id && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Template</Button>
        </div>
      </CardContent>
    </Card>
  )
}

