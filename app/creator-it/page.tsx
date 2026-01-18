import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Video, Radio, Workflow, Zap, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Creator-IT | K.I.T. Solutions Koblenz",
  description:
    "Professionelle IT-Setups für Content Creator, Streamer und Podcaster in Koblenz. Stabile Technik für maximale Produktivität.",
}

const useCases = [
  {
    icon: Radio,
    title: "Streaming-Setups",
    description:
      "Stabile, professionelle Live-Streaming-Umgebungen für Twitch, YouTube und andere Plattformen. Mit zuverlässiger Hardware und Software.",
  },
  {
    icon: Mic,
    title: "Podcast-Setups",
    description:
      "Vom Solo-Setup bis zum Multi-Host-Studio: Audio-Routing, Aufnahme-Workflows und professionelle Nachbearbeitung.",
  },
  {
    icon: Video,
    title: "Video-Produktion",
    description:
      "Effiziente Workflows für YouTube, Social Media und Content-Produktion. Schnitt, Encoding und Render-Optimierung.",
  },
  {
    icon: Workflow,
    title: "Content-Workflows",
    description:
      "Optimierte Abläufe für regelmäßige Content-Produktion. Automatisierung, Backups und nahtlose Integration aller Tools.",
  },
]

const services = [
  {
    icon: Settings,
    title: "Planung & Beratung",
    description: "Analyse deiner Anforderungen und Empfehlungen für Hardware, Software und Workflows.",
  },
  {
    icon: Zap,
    title: "Einrichtung & Konfiguration",
    description: "Installation und Optimierung aller Komponenten. Von OBS Studio bis Audio-Interface.",
  },
  {
    icon: Workflow,
    title: "Optimierung & Support",
    description: "Performance-Tuning, Troubleshooting und laufende Unterstützung für deinen Produktions-Workflow.",
  },
]

export default function CreatorITPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Creator-IT: <span className="text-primary">Technik, die funktioniert.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Du erstellst Content, streamst oder produzierst Podcasts? Ich sorge dafür, dass deine Technik stabil läuft
              – damit du dich auf das Wesentliche konzentrieren kannst.
            </p>
          </div>

          {/* What is Creator-IT */}
          <Card className="bg-primary/5 border-primary/20 mb-16">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-3xl font-bold">Was ist Creator-IT?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Creator-IT verbindet klassische IT-Dienstleistungen mit den speziellen Anforderungen von Content Creators,
                Streamern und Podcastern. Es geht um <strong className="text-foreground">stabile Setups</strong>,{" "}
                <strong className="text-foreground">effiziente Workflows</strong> und{" "}
                <strong className="text-foreground">zuverlässige Technik</strong> – nicht um schickes Equipment, sondern
                um nachhaltige Lösungen, die einfach funktionieren.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ob Live-Streaming, Audio-Recording oder Video-Produktion: Ich helfe dir bei Planung, Einrichtung und
                Optimierung deiner Technik, damit du dich voll und ganz auf deine Inhalte konzentrieren kannst.
              </p>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <div className="mb-16">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Anwendungsfälle für <span className="text-primary">Creator-IT</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von Streaming bis Content-Produktion – ich unterstütze dich bei allen technischen Herausforderungen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <useCase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{useCase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Was ich für dich <span className="text-primary">tue</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von der ersten Beratung bis zur laufenden Optimierung – ich begleite dich bei jedem Schritt.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Me */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 mb-16">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Warum <span className="text-primary">K.I.T. Solutions</span>?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Fokus auf Stabilität</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Kein Spielzeug, sondern robuste Lösungen für den produktiven Einsatz.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Open Source & Nachhaltigkeit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ich setze wo möglich auf freie Software und langlebige Hardware.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Persönliche Betreuung</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Kein Callcenter, sondern direkter Kontakt und individuelle Lösungen.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Faire Preise</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Transparente Kalkulation ohne versteckte Kosten oder Abozwang.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">Bereit für dein Creator-Setup?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lass uns in einem kostenlosen Erstgespräch über deine Anforderungen sprechen. Ich zeige dir, wie ich dich
              unterstützen kann.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/#kontakt">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/preise">Preise ansehen</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
