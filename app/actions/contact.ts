"use server"

interface ContactFormData {
  name: string
  email: string
  message: string
  customerNumber?: string
}

interface ContactResponse {
  success: boolean
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    // Validate form data
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Bitte fülle alle Pflichtfelder aus.",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Bitte gib eine gültige E-Mail-Adresse ein.",
      }
    }

    const formSent = await sendFormspree(data)

    // Send Discord notification
    const discordSent = await sendDiscordNotification(data)

    if (!formSent && !discordSent) {
      return {
        success: false,
        message: "Es gab ein Problem beim Versenden. Bitte versuche es später erneut.",
      }
    }

    return {
      success: true,
      message: "Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
    }
  }
}

async function sendFormspree(data: ContactFormData): Promise<boolean> {
  try {
    const formspreeId = process.env.FORMSPREE_FORM_ID

    if (!formspreeId) {
      console.error("Formspree form ID not configured")
      return false
    }

    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        customerNumber: data.customerNumber || "",
        _subject: `Neue Kontaktanfrage von ${data.name}`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Formspree sending failed:", errorText)
      return false
    }

    return true
  } catch (error) {
    console.error("Formspree error:", error)
    return false
  }
}

async function sendDiscordNotification(data: ContactFormData): Promise<boolean> {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("[v0] Discord webhook URL not configured")
      return false
    }

    const embed = {
      title: "🔔 Neue Kontaktanfrage",
      color: 0xff9100, // Orange color from brand
      fields: [
        {
          name: "👤 Name",
          value: data.name,
          inline: true,
        },
        {
          name: "📧 E-Mail",
          value: data.email,
          inline: true,
        },
        ...(data.customerNumber
          ? [
              {
                name: "🔢 Kundennummer",
                value: data.customerNumber,
                inline: true,
              },
            ]
          : []),
        {
          name: "💬 Nachricht",
          value: data.message.length > 1024 ? data.message.substring(0, 1021) + "..." : data.message,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "K.I.T. Solutions Kontaktformular",
      },
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      console.error("[v0] Discord webhook failed:", await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Discord webhook error:", error)
    return false
  }
}
