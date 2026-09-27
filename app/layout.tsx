import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NiChAm Trade - Solar & Inverter Marketplace',
  description: 'World-class solar, inverter, battery trade platform - WhatsApp 2347050477950',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0}}>{children}</body>
    </html>
  )
}
