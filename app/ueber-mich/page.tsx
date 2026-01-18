import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Leaf, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Über mich | K.I.T. Solutions Koblenz",
  description:
    "Lerne Joshua Phu Kuhrau kennen, den Gründer von K.I.T. Solutions – für nachhaltige, ehrliche IT in Koblenz.",
}

const values = [
  {
    icon: Leaf,
    title: "Nachhaltigkeit & Open Source",
    description:
      "Ich setze auf langlebige Lösungen und freie Software, die nicht nur heute, sondern auch morgen funktioniert.",
  },
  {
    icon: Shield,
    title: "Ehrlichkeit & Transparenz",
    description: "Keine versteckten Kosten, keine unnötigen Verkäufe. Ich sage dir, was du wirklich brauchst.",
  },
  {
    icon: Heart,
    title: "Menschlichkeit vor Profit",
    description: "Technik soll Menschen helfen, nicht umgekehrt. Ich arbeite nach Vertrauen, nicht nach Verträgen.",
  },
]

export default function UeberMichPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Wer hinter <span className="text-primary">K.I.T.</span> steht.
            </h1>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
            {/* Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image src="/profile-pic.png" alt="Joshua Phu Kuhrau" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Intro Text */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Joshua Phu Kuhrau</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ich bin Joshua Phu Kuhrau – Fachinformatiker für Systemintegration und Gründer von K.I.T. Solutions.
                  Nach mehreren Jahren im IT-Support bei Unternehmen wie Amazon und Computacenter habe ich mich
                  entschieden, IT anders zu denken:{" "}
                  <span className="text-primary font-semibold">nachhaltig, verständlich und ehrlich</span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Neben klassischem IT-Support biete ich auch Creator-IT an – spezialisierte Technik-Unterstützung für
                  Streamer, Podcaster und Content Creator. Diese Erweiterung entstand aus eigener Erfahrung: Als ich
                  selbst Content produziert habe, habe ich gemerkt, wie wichtig stabile, gut konfigurierte Setups sind.
                  Diese Expertise gebe ich jetzt an andere Creator weiter.
                </p>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Was mich antreibt</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ich habe K.I.T. Solutions gegründet, weil ich glaube, dass Technik Menschen helfen soll – nicht
                    umgekehrt. Ich arbeite nicht nach Verträgen, sondern nach Vertrauen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meine <span className="text-primary">Werte</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 mb-16">
            <CardContent className="p-12 text-center">
              <blockquote className="space-y-4">
                <p className="text-2xl md:text-3xl font-bold text-foreground italic">
                  „IT muss nicht schmutzig sein – sie muss menschlich sein."
                </p>
                <footer className="text-muted-foreground">— Joshua Phu Kuhrau</footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">Lass uns zusammenarbeiten</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Du suchst einen IT-Partner, der ehrlich ist und deine Bedürfnisse versteht? Dann melde dich bei mir für
              ein kostenloses Erstgespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/#kontakt">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#werte">Mehr über meine Werte erfahren</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
