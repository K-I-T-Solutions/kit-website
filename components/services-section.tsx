import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Wifi, HardDrive, Home, Headset, Wrench, Radio, Clapperboard } from "lucide-react"

const services = [
  {
    icon: Monitor,
    title: "PC- / Laptop-Hilfe",
    description: "Probleme mit deinem Computer? Wir reparieren, optimieren und richten ein.",
  },
  {
    icon: Wifi,
    title: "Netzwerke & WLAN",
    description: "Stabiles Internet für zuhause und im Büro. Wir sorgen für optimale Verbindung.",
  },
  {
    icon: HardDrive,
    title: "Datensicherung & Cloud",
    description: "Deine Daten sind wertvoll. Wir sichern sie professionell und nachhaltig.",
  },
  {
    icon: Radio,
    title: "Creator-IT",
    description: "Streaming-Setups, Podcast-Studios und Content-Workflows. Technik, die funktioniert.",
  },
  {
    icon: Clapperboard,
    title: "Content & Medien",
    description: "Digitale Medienproduktion und kreative Workflows für deine Content-Projekte.",
  },
  {
    icon: Home,
    title: "Smart Home & Geräte",
    description: "Smarte Technik einfach gemacht. Wir richten deine Geräte ein und vernetzen sie.",
  },
  {
    icon: Headset,
    title: "Fernwartung",
    description: "Schnelle Hilfe per Fernzugriff. Wir lösen viele Probleme direkt online.",
  },
  {
    icon: Wrench,
    title: "Vor-Ort-Service",
    description: "Persönlicher Support bei dir zuhause oder im Büro in Koblenz und Umgebung.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 px-4 bg-background/50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Unsere <span className="text-primary">Leistungen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Reparatur bis zur Einrichtung – wir kümmern uns um deine IT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  )
}
