"use client"

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/#leistungen", label: "Leistungen" },
    { href: "/creator-it", label: "Creator-IT" },
    { href: "/preise", label: "Preise" },
    { href: "/ueber-mich", label: "Über mich" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-white.png"
              alt="K.I.T. Solutions"
              width={120}
              height={48}
              className="h-10 w-auto dark:block hidden"
            />
            <Image
              src="/images/logo-dark.png"
              alt="K.I.T. Solutions"
              width={120}
              height={48}
              className="h-10 w-auto dark:hidden block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
