import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"
import "./global.css"
import { ThemeProvider } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansJp.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="fixed top-4 right-4">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
