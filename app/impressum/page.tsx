import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Impressum | K.I.T. Solutions Koblenz",
  description: "Impressum und rechtliche Angaben von K.I.T. Solutions Koblenz",
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Impressum</h1>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p className="font-medium text-foreground">K.I.T. Solutions</p>
              <p>Joshua Phu Kuhrau</p>
              <p>Dietzstr. 1</p>
              <p>56073 Koblenz</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-foreground">E-Mail:</span>{" "}
                <a href="mailto:info@kit-it-koblenz.de" className="text-primary hover:underline">
                  info@kit-it-koblenz.de
                </a>
              </p>
              <p>
                <span className="font-medium text-foreground">Website:</span>{" "}
                <a href="https://kit-it-koblenz.de" className="text-primary hover:underline">
                  https://kit-it-koblenz.de
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Verantwortlich für den Inhalt</h2>
            <p>Joshua Phu Kuhrau</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">EU-Streitschlichtung</h2>
            <p className="leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h2>
            <p className="leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Inhalte</h2>
            <p className="leading-relaxed mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
              eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="leading-relaxed">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
              konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Links</h2>
            <p className="leading-relaxed mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p className="leading-relaxed">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
              Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Urheberrecht</h2>
            <p className="leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
              von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
