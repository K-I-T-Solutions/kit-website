"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MessageSquare, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message })
        setFormData({
          name: "",
          email: "",
          message: "",
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

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hallo K.I.T. Team, ich brauche Hilfe bei:")
    window.open(`https://wa.me/491741543053?text=${message}`, "_blank")
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lass uns <span className="text-primary">reden</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schildere uns dein Problem – wir finden eine Lösung
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Dein Anliegen *</Label>
                <Textarea
                  id="message"
                  placeholder="Beschreibe kurz, wobei wir dir helfen können..."
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border resize-none"
                  disabled={isSubmitting}
                />
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Absenden
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent"
                  disabled={isSubmitting}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Rückruf anfordern
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Wir antworten in der Regel innerhalb von 24 Stunden
        </p>
      </div>
    </section>
  )
}
