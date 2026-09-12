'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function calcTotal(base: number) {
  const competitivePrice = base * 0.98
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrow)
}

const PROMPTS: any = {
  en: { welcome: "Welcome to Nicham Solar Market.", langCode: "en-NG" },
  pidgin: { welcome: "Welcome to Nicham Solar Market.", langCode: "en-NG" },
  ha: { welcome: "Barka da zuwa kasuwar Nicham Solar.", langCode: "ha" },
  ig: { welcome: "Nnoo na ahia Nicham Solar.", langCode: "ig" },
  yo: { welcome: "Kaabo si oja Nicham Solar.", langCode: "yo" }
}

export default function VoiceOrder({ lang, currentMode }: { lang: string, currentMode: 'listing' | 'order' }) {
  const [isListening, setIsListening] = useState(false)
  const [response, setResponse] = useState(PROMPTS.en.welcome)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)
  const [showTapOverlay, setShowTapOverlay] = useState(false)
  const router = useRouter()
  const p = PROMPTS[lang] || PROMPTS.en

  useEffect(() => {
    const load = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis.getVoices().length > 0) setVoicesReady(true)
    }
    load()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = load
    }
    const t = setTimeout(() => setVoicesReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setResponse(p.welcome)
    if (currentMode === 'listing' && !hasPlayedWelcome && voicesReady) {
      const play = () => {
        try {
          if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel()
            const u = new SpeechSynthesisUtterance(p.welcome)
            u.lang = p.langCode
            u.rate = 0.85
            u.onstart = () => {
              setHasPlayedWelcome(true)
              setShowTapOverlay(false)
            }
            u.onend = () => {
              setTimeout(() => setIsMinimized(true), 2000)
            }
            u.onerror = () => setShowTapOverlay(true)
            window.speechSynthesis.speak(u)
            setTimeout(() => {
              if (!window.speechSynthesis.speaking && !hasPlayedWelcome) {
                setShowTapOverlay(true)
              }
            }, 900)
          }
        } catch {
          setShowTapOverlay(true)
        }
      }
      const t = setTimeout(play, 800)
      const handler = () => {
        if (!hasPlayedWelcome) {
          clearTimeout(t)
          play()
        }
        document.removeEventListener('click', handler)
        document.removeEventListener('touchstart', handler)
      }
      document.addEventListener('click', handler)
      document.addEventListener('touchstart', handler)
      return () => {
        clearTimeout(t)
        document.removeEventListener('click', handler)
        document.removeEventListener('touchstart', handler)
      }
    }
  }, [lang, currentMode, voicesReady, hasPlayedWelcome, p])

  const handleMic = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) {
      alert("Voice not supported")
      return
    }
    const rec = new SR()
    rec.lang = p.langCode
    rec.onstart = () => setIsListening(true)
    rec.onend = () => setIsListening(false)
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes("yes")) {
        if (currentMode === 'listing') {
          router.push("/product/6?lang=" + lang)
        } else {
          const orderId = "NCH-" + Date.now().toString().slice(-6)
          const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
          orders.unshift({ productName: "Solar Product", total: 150000, orderId })
          localStorage.setItem('nicham_orders', JSON.stringify(orders))
          const msg = "Order confirmed. ID " + orderId + ". Thank you."
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
          try {
            const u = new SpeechSynthesisUtterance(p.welcome)
            u.lang = p.langCode
            window.speechSynthesis.speak(u)
            setHasPlayedWelcome(true)
            setTimeout(() => setIsMinimized(true), 2000)
          } catch {}
        }}>
          <div className="bg-yellow-400 text-black rounded-2xl p-6 max-w-sm text-center font-bold">
            <div className="text-3xl mb-2">Tap to start</div>
            <div className="text-sm">Tap to hear welcome</div>
          </div>
        </div>
      )}
      <div className={`fixed bottom-4 left-4 right-4 md:w-96 bg-white rounded-2xl shadow-2xl border z-40 ${isMinimized ? 'p-2' : 'p-4'}`}>
        <div className="flex justify-between mb-2">
          <b className="text-sm">Voice Market</b>
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-xs bg-gray-100 px-2 py-1 rounded">
            {isMinimized ? 'Expand' : 'Minimize'}
          </button>
        </div>
        {!isMinimized && (
          <>
            <div className="text-xs bg-gray-50 p-2 rounded mb-2">{response}</div>
            <button onClick={handleMic} className={`w-full py-3 rounded-full font-bold ${isListening ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>
              {isListening ? 'Listening...' : 'Press & Say YES'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
