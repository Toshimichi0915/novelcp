import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"
import "./global.css"

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "novelcp",
  description: "Copy narou novels into your own database",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJp.variable}`}>{children}</body>
    </html>
  )
}
