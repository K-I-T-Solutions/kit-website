import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Mail, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Links - K.I.T. Solutions",
  description: "Alle wichtigen Links zu K.I.T. Solutions - IT-Support in Koblenz",
}

export default function LinksPage() {
  const links = [
    {
      name: "Instagram",
      username: "@kit.koblenz",
      url: "https://instagram.com/kit.koblenz",
      icon: Instagram,
      color: "from-purple-600 to-pink-600",
    },
    {
      name: "Facebook",
      username: "@kit.koblenz",
      url: "https://facebook.com/kit.koblenz",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "E-Mail",
      username: "info@kit-it-koblenz.de",
      url: "mailto:info@kit-it-koblenz.de",
      icon: Mail,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      {/* Back to home link */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Zurück zur Startseite</span>
      </Link>

      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Logo and branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-white.png"
              alt="K.I.T. Solutions Logo"
              width={200}
              height={80}
              className="dark:block hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              alt="K.I.T. Solutions Logo"
              width={200}
              height={80}
              className="dark:hidden block"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground">K.I.T. Solutions</h1>
          <p className="text-muted-foreground">IT-Support in Koblenz - Folge uns und bleib in Kontakt</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.name !== "E-Mail" ? "_blank" : undefined}
                rel={link.name !== "E-Mail" ? "noopener noreferrer" : undefined}
                className="group block w-full"
              >
                <div className="relative overflow-hidden rounded-lg border border-border bg-card hover:bg-accent/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20">
                  <div className="flex items-center gap-4 p-5">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{link.username}</p>
                    </div>
                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Footer text */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">Dein lokaler IT-Partner in Koblenz</p>
          <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors inline-block mt-2">
            kit-it-koblenz.de
          </Link>
        </div>
      </div>
    </div>
  )
}
