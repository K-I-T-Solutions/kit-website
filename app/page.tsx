"use client"

import { useState, useEffect } from "react"
import { Wrench, Mail, Phone, Clock } from "lucide-react"

export default function UnderConstruction() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center space-y-8">
          {/* Icon with animation */}
          <div className="flex justify-center">
            <div
              className={`transition-all duration-1000 ${
                mounted ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-180 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-card border-2 border-primary/20 rounded-full p-8 shadow-2xl">
                  <Wrench className="w-20 h-20 text-primary animate-[spin_4s_ease-in-out_infinite]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1
              className={`font-heading text-5xl md:text-7xl font-bold text-foreground transition-all duration-700 delay-200 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Website in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Bearbeitung
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Wir überarbeiten gerade unsere Website, um dir ein noch besseres Erlebnis zu bieten.
            </p>
          </div>

          {/* Status indicator */}
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 bg-card border border-primary/20 rounded-full shadow-lg transition-all duration-700 delay-400 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Clock className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-foreground font-medium">Voraussichtlich zurück: Bald</span>
          </div>

          {/* Contact section */}
          <div
            className={`mt-12 pt-8 border-t border-border transition-all duration-700 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-muted-foreground mb-6">
              Dringender IT-Support? Wir sind weiterhin für dich da:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@kit-it-koblenz.de"
                className="group flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span>info@kit-it-koblenz.de</span>
              </a>
              <a
                href="https://wa.me/491741543053"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-card border-2 border-primary/20 text-foreground rounded-lg font-medium hover:bg-primary/10 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>WhatsApp: 0174 1543053</span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`mt-12 text-sm text-muted-foreground transition-all duration-700 delay-600 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p>K.I.T. Solutions – IT-Support & Creator-IT in Koblenz</p>
            <p className="mt-2">Schnell. Verständlich. Fair.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
