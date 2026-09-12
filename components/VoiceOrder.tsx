'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PROMPTS: any = {
  en: { welcome: "Welcome to Nicham solar market, type the product you want in the search column or click on the microphone and say the name of the product you want, then click search. The microphone is next to the search box.", langCode: "en-NG" },
  pidgin: { welcome: "Welcome to Nicham solar market, type the product you want in the search column or click on the microphone and say the name of the product you want, then click search.", langCode: "en-NG" },
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
  const router = useRouter()
  const p = PROMPTS[lang] || PROMPTS.en

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis.getVoices().length > 0) {
        setVoicesReady(true)
      }
    }
    loadVoices()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
    const t = setTimeout(() => setVoicesReady(true), 1500)
    return () => {
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    setResponse(p.welcome)
    return () => {}
  }, [p.welcome])

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
      if (txt.includes("yes") && currentMode === 'order') {
        const orderId = "NCH-" + Date.now().toString().slice(-6)
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        orders.unshift({ productName: "Solar Product", total: 150000, orderId, date: new Date().toLocaleString() })
        localStorage.setItem('nicham_orders', JSON.stringify(orders))
        const msg = "Order confirmed. ID " + orderId + ". Thank you."
        setResponse(msg)
        const u = new SpeechSynthesisUtterance(msg)
        window.speechSynthesis.speak(u)
      }
    }
    rec.start()
  }

  if (currentMode === 'listing') {
    return null
  }

  return (
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
            {isListening ? 'Listening...' : 'Press & Say YES to Confirm'}
          </button>
        </>
      )}
    </div>
  )
}
