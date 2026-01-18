"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    document.documentElement.classList.toggle("light", initialTheme === "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 hover:bg-secondary transition-colors"
      aria-label="Theme wechseln"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground transition-transform hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform hover:-rotate-12" />
      )}
    </Button>
  )
}
