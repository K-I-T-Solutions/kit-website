import { Card, CardContent } from "@/components/ui/card"
import { Heart, Leaf, DollarSign, MapPin } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Persönlich & verständlich",
    description:
      "Wir sprechen deine Sprache – ohne komplizierte Fachbegriffe. Du hast immer einen direkten Ansprechpartner.",
  },
  {
    icon: Leaf,
    title: "Nachhaltig & Open Source",
    description: "Wir setzen auf langlebige Lösungen und Open-Source-Software für mehr Transparenz und Unabhängigkeit.",
  },
  {
    icon: DollarSign,
    title: "Transparent & fair",
    description: "Klare Preise, keine versteckten Kosten. Du weißt vorher, was auf dich zukommt.",
  },
  {
    icon: MapPin,
    title: "Lokal & flexibel",
    description:
      "Aus Koblenz, für Koblenz. Wir sind schnell vor Ort oder helfen per Fernwartung – wie es für dich passt.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 px-4 bg-background/50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Warum <span className="text-primary">K.I.T. Solutions</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir machen IT anders – ehrlich, nachhaltig und auf Augenhöhe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
