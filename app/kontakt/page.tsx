"use client"

import type React from "react"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, MapPin, Clock, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    acceptPrivacy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptPrivacy) {
      setSubmitStatus({
        type: "error",
        message: "Bitte stimme der Datenschutzerklärung zu.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: `Betreff: ${formData.subject}\n\n${formData.message}`,
      })

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message })
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          acceptPrivacy: false,
        })
      } else {
        setSubmitStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Kontakt <span className="text-primary">aufnehmen</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ob Sie technische Hilfe brauchen, eine Idee besprechen möchten oder einfach eine ehrliche Meinung zu Ihrer
              IT – ich freue mich auf Ihre Nachricht.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Max Mustermann"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="max@beispiel.de"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff *</Label>
                    <Input
                      id="subject"
                      placeholder="Worum geht es?"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea
                      id="message"
                      placeholder="Beschreibe kurz, wobei ich dir helfen kann..."
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-border resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                      Ich stimme der{" "}
                      <Link href="/datenschutz" className="text-primary hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      zu *
                    </Label>
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`flex items-center gap-2 p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{submitStatus.message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Personal Touch */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed">
                    <span className="text-primary font-semibold">Ich beantworte jede Anfrage persönlich</span> – kein
                    Bot, kein Callcenter. Du schreibst mir direkt und bekommst eine ehrliche, menschliche Antwort.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Kontaktdaten</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">E-Mail</h4>
                      <a
                        href="mailto:info@kit-it-koblenz.de"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@kit-it-koblenz.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Adresse</h4>
                      <p className="text-muted-foreground">
                        Dietzstr. 1<br />
                        56073 Koblenz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Verfügbarkeit</h4>
                      <p className="text-muted-foreground">Nach Vereinbarung</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview Placeholder */}
              <Card className="bg-muted border-border overflow-hidden">
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">Koblenz, Deutschland</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Response Time Notice */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                <span className="text-primary font-semibold">Antwortzeit:</span> Ich melde mich in der Regel innerhalb
                von 24 Stunden bei dir zurück.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
