import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container px-4 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 text-center md:text-left">
          {/* Logo and tagline */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/images/logo-white.png"
              alt="K.I.T. Solutions"
              width={150}
              height={60}
              className="h-12 w-auto dark:block hidden"
            />
            <Image
              src="/images/logo-dark.png"
              alt="K.I.T. Solutions"
              width={150}
              height={60}
              className="h-12 w-auto dark:hidden block"
            />
            <p className="text-sm text-muted-foreground italic">„IT muss nicht schmutzig sein."</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#leistungen" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Leistungen
              </Link>
              <Link href="/preise" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Preise
              </Link>
              <Link href="/ueber-mich" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Über mich
              </Link>
              <Link href="/#kontakt" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Rechtliches</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/datenschutz" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Impressum
              </Link>
            </nav>
          </div>

          {/* Social media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Folge uns</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} K.I.T. Solutions Koblenz. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
