'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const products = [
  { id: 1, name: "Solar Cargo Bike 500W", basePrice: 400000 },
  { id: 2, name: "Solar Irrigation Pump", basePrice: 280000 },
  { id: 3, name: "Solar Freezer 200L", basePrice: 240000 },
  { id: 4, name: "Solar Home System 5kW", basePrice: 2200000 },
  { id: 5, name: "Solar Tractor 20HP", basePrice: 3400000 },
  { id: 6, name: "Solar Dryer 100kg", basePrice: 130000 },
  { id: 7, name: "Solar Boat Engine", basePrice: 160000 },
  { id: 8, name: "Solar Ferry 12 Seater", basePrice: 1050000 },
  { id: 9, name: "Collapsible Solar E-Bike", basePrice: 250000 },
]

function calcTotal(base: number) {
  const competitivePrice = base * 0.98
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrow)
}

const prompts: any = {
  en: { welcome: "Welcome to Nicham Solar Market, powered by GSPI Associates. 9 solar products. Total price only. best market price. You earn green points. Say product name like Solar Bike, or press mic.", langCode: "en-NG" },
}

export default function VoiceOrder({ lang, currentMode }: { lang: string, currentMode: 'listing' | 'order' }) {
  const [isListening, setIsListening] = useState(false)
  const [response, setResponse] = useState(prompts.en.welcome)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)
  const [showTapOverlay, setShowTapOverlay] = useState(false)
  const router = useRouter()
  const p = prompts[lang] || prompts.en

  useEffect(() => {
    const load = () => { if (window.speechSynthesis.getVoices().length > 0) setVoicesReady(true) }
    load()
    if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = load
    const t = setTimeout(() => setVoicesReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setResponse(p.welcome)
    if (currentMode === 'listing' && !hasPlayedWelcome && voicesReady) {
      const play = () => {
        try {
          window.speechSynthesis.cancel()
          const u = new SpeechSynthesisUtterance(p.welcome)
          u.lang = p.langCode
          u.rate = 0.85
          u.onstart = () => { setHasPlayedWelcome(true); setShowTapOverlay(false) }
          u.onend = () => setTimeout(() => setIsMinimized(true), 2000)
          u.onerror = () => setShowTapOverlay(true)
          window.speechSynthesis.speak(u)
          setTimeout(() => { if (!window.speechSynthesis.speaking && !hasPlayedWelcome) setShowTapOverlay(true) }, 900)
        } catch { setShowTapOverlay(true) }
      }
      const t = setTimeout(play, 800)
      const h = () => { clearTimeout(t); if (!hasPlayedWelcome) play(); document.removeEventListener('click', h); document.removeEventListener('touchstart', h) }
      document.addEventListener('click', h)
      document.addEventListener('touchstart', h)
      return () => { clearTimeout(t); document.removeEventListener('click', h); document.removeEventListener('touchstart', h) }
    }
  }, [lang, currentMode, voicesReady, hasPlayedWelcome, p])

  const handleMic = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) { alert("Voice not supported"); return }
    const rec = new SR()
    rec.lang = p.langCode
    rec.onstart = () => setIsListening(true)
    rec.onend = () => setIsListening(false)
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes("yes")) {
        if (currentMode === 'listing') router.push("/product/1?lang=" + lang)
        else {
          const orderId = "NCH-" + Date.now().toString().slice(-6)
          const saving = Math.round(products[0].basePrice * 0.02)
          const total = calcTotal(products[0].basePrice)
          const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
          orders.unshift({ productName: products[0].name, total, orderId, saving })
          localStorage.setItem('nicham_orders', JSON.stringify(orders))
          const msg = "Order confirmed. ID " + orderId + ". Saved " + saving + " . best market price. Carbon with MTN."
          setResponse(msg)
          const u = new SpeechSynthesisUtterance(msg)
          window.speechSynthesis.speak(u)
        }
      }
    }
    rec.start()
  }

  return (
    <>
      {showTapOverlay && currentMode === 'listing' && !hasPlayedWelcome && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={() => {
          setShowTapOverlay(false)
          const u = new SpeechSynthesisUtterance(p.welcome)
          u.lang = p.langCode
          window.speechSynthesis.speak(u)
          setHasPlayedWelcome(true)
          setTimeout(() => setIsMinimized(true), 2000)
        }}>
          <div className="bg-yellow-400 text-black rounded-2xl p-6 max-w-sm text-center font-bold">
            <div className="text-3xl mb-2">Tap to start Voice Market</div>
            <div className="text-sm">Chrome blocks auto-talk. Tap here.</div>
            <div className="mt-3 bg-black text-white px-4 py-2 rounded-full text-xs">best price</div>
          </div>
        </div>
      )}
      <div className={`fixed bottom-4 left-4 right-4 md:w-96 bg-white rounded-2xl shadow-2xl border z-40 ${isMinimized ? 'p-2' : 'p-4'}`}>
        <div className="flex justify-between mb-2"><b className="text-sm">Voice Market 2% cheaper</b><button onClick={() => setIsMinimized(!isMinimized)} className="text-xs bg-gray-100 px-2 py-1 rounded">{isMinimized ? 'Expand' : 'Minimize'}</button></div>
        {!isMinimized && (
          <>
            <div className="text-xs bg-gray-50 p-2 rounded mb-2">{response}</div>
            <button onClick={handleMic} className={`w-full py-3 rounded-full font-bold ${isListening ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>{isListening ? 'Listening...' : 'Press & Say YES'}</button>
            <div className="text-[10px] text-gray-500 mt-1 text-center">Best price - Green points - 36 states delivery</div>
          </>
        )}
      </div>
    </>
  )
}
