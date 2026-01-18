import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Über <span className="text-primary">uns</span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-foreground">
                Wir sind <strong>K.I.T. Solutions</strong> – dein persönlicher IT-Partner aus Koblenz.
              </p>
              <p className="text-muted-foreground">
                Wir erklären Technik einfach und helfen dort, wo andere aufgeben. Keine anonymen Hotlines, kein
                Tech-Blabla – nur ehrliche, nachhaltige IT-Lösungen mit persönlichem Kontakt.
              </p>
              <p className="text-muted-foreground">
                Von klassischem IT-Support bis zu Creator-IT für Streamer, Podcaster und Content Creator: Wir helfen
                dir bei allem, was mit Technik zu tun hat – verständlich, nachhaltig und fair.
              </p>
              <p className="text-muted-foreground">
                Unser Fokus liegt auf <strong className="text-foreground">Open Source</strong>,{" "}
                <strong className="text-foreground">Datenschutz</strong> und{" "}
                <strong className="text-foreground">fairen Preisen</strong>. Denn IT muss nicht schmutzig sein.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <Image src="/images/logo-white.png" alt="K.I.T. Solutions" fill className="object-contain p-12" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
