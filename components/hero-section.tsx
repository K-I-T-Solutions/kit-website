"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with subtle orange glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] orange-glow" />

      {/* Hexagonal pattern overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5">
        <Image src="/images/hero-banner.jpg" alt="" fill className="object-cover" priority />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="/images/logo-white.png"
              alt="K.I.T. Solutions Koblenz"
              width={200}
              height={80}
              className="h-20 w-auto dark:block hidden"
            />
            <Image
              src="/images/logo-dark.png"
              alt="K.I.T. Solutions Koblenz"
              width={200}
              height={80}
              className="h-20 w-auto dark:hidden block"
            />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance orange-glow-text">
            Deine digitale Welt spinnt? <span className="text-primary">Wir fixen sie.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
            K.I.T. Solutions – IT-Support und Creator-IT in Koblenz.{" "}
            <span className="text-foreground font-medium">Schnell. Verständlich. Fair.</span>
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              Termin vereinbaren
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}
