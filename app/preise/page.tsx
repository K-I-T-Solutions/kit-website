import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Preise | K.I.T. Solutions Koblenz",
  description: "Faire und transparente Preise für IT-Support in Koblenz. Keine versteckten Kosten, kein Abozwang.",
}

const privateServices = [
  { name: "PC- und Laptop-Service", price: "ab 59 € / Std." },
  { name: "WLAN-Einrichtung", price: "pauschal 69 €" },
  { name: "Datensicherung & Wiederherstellung", price: "ab 89 €" },
  { name: "Smart-Home & Streaming-Setup", price: "ab 79 €" },
  { name: "Creator-IT (Streaming, Podcasting)", price: "ab 89 € / Setup" },
]

const businessServices = [
  { name: "IT-Beratung & Netzwerkbetreuung", price: "ab 79 € / Std." },
  { name: "NAS / Server Einrichtung", price: "ab 249 € (pro System)" },
  { name: "Cloud / Open-Source Lösungen", price: "ab 299 € (Nextcloud, Vaultwarden usw.)" },
  { name: "Creator-IT & Content-Workflows", price: "ab 149 € / Projekt" },
  { name: "Wartung & Monitoring", price: "nach Absprache (monatliche Betreuung ab 49 €)" },
]

const transparencyPoints = ["Kein Abozwang", "Kostenloses Erstgespräch", "Fahrtkosten (Koblenz + 10 km) inklusive"]

export default function PreisePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Faire Preise. <span className="text-primary">Klare Leistung.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ich glaube, dass gute IT nicht kompliziert und nicht teuer sein muss. Meine Preise sind fair kalkuliert
              und immer transparent – ohne Abozwang oder versteckte Kosten.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Privatkunden */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Privatkunden</h2>
                  <p className="text-muted-foreground">IT-Support für zuhause</p>
                </div>

                <div className="space-y-4">
                  {privateServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <span className="text-foreground font-medium">{service.name}</span>
                      <span className="text-primary font-semibold whitespace-nowrap">{service.price}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/#kontakt">
                    Jetzt anfragen
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Kleine Unternehmen */}
            <Card className="bg-card border-primary/50 hover:border-primary transition-all duration-300 shadow-lg shadow-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                Beliebt
              </div>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Kleine Unternehmen</h2>
                  <p className="text-muted-foreground">Professionelle IT-Betreuung</p>
                </div>

                <div className="space-y-4">
                  {businessServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <span className="text-foreground font-medium">{service.name}</span>
                      <span className="text-primary font-semibold whitespace-nowrap text-right">{service.price}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/#kontakt">
                    Jetzt anfragen
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transparency Block */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Transparenz ist mir wichtig</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {transparencyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-16 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">Noch Fragen zu den Preisen?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kontaktiere mich für ein kostenloses Erstgespräch. Ich berate dich gerne und erstelle dir ein
              individuelles Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/#kontakt">
                  Jetzt anfragen
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#leistungen">Leistungen vergleichen</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
