import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <BenefitsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
