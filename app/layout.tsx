import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "K.I.T. Solutions – IT-Support & Creator-IT in Koblenz | Schnell. Verständlich. Fair.",
  description:
    "Deine digitale Welt spinnt? Wir fixen sie. K.I.T. Solutions bietet persönlichen IT-Support und Creator-IT für Privatkunden, Creator und kleine Unternehmen in Koblenz. PC-Hilfe, Netzwerke, Streaming-Setups, Content-Workflows und mehr.",
  keywords: "IT-Support Koblenz, Creator-IT Koblenz, Streaming Setup Koblenz, Podcast Setup, Content Creation, Computerhilfe Koblenz, Netzwerkhilfe Koblenz, PC Reparatur, IT Service",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${sourceSans.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
