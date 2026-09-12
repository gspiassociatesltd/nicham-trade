
import './globals.css'
export const metadata = { title: 'NiChAm Trade - Solar Market', description: 'All Nigeria Solar Market - Market + MTN MoMo + Ayoba' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-gray-50">{children}</body></html>)
}
