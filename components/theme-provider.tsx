"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

// Add the useTheme hook to access the theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  attribute: string
  defaultTheme: Theme
  enableSystem: boolean
  disableTransitionOnChange: boolean
}

export function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.setAttribute(attribute, isDark ? "dark" : "light")
    } else if (theme) {
      root.setAttribute(attribute, theme)
    }
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

