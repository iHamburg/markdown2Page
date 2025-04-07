"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface SettingsProps {
  settings: {
    fontSize: number
    fontFamily: string
    lineHeight: number
    textColor: string
    backgroundColor: string
    padding: number
  }
  setSettings: (settings: any) => void
  onClose: () => void
}

export function Settings({ settings, setSettings, onClose }: SettingsProps) {
  const fontFamilies = [
    "Inter, sans-serif",
    "Arial, sans-serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Times New Roman, serif",
  ]

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Appearance Settings</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          These settings will override template defaults. Use the template selector to choose a base style.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size: {settings.fontSize}px</Label>
            <Slider
              id="fontSize"
              min={12}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={(value) => handleChange("fontSize", value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select value={settings.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font.split(",")[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineHeight">Line Height: {settings.lineHeight}</Label>
            <Slider
              id="lineHeight"
              min={1}
              max={2.5}
              step={0.1}
              value={[settings.lineHeight]}
              onValueChange={(value) => handleChange("lineHeight", value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={settings.textColor}
                onChange={(e) => handleChange("textColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.textColor}
                onChange={(e) => handleChange("textColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="padding">Padding: {settings.padding}px</Label>
            <Slider
              id="padding"
              min={0}
              max={50}
              step={1}
              value={[settings.padding]}
              onValueChange={(value) => handleChange("padding", value[0])}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

