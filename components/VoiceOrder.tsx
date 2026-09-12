'use client'
import { useState, useEffect } from 'react'

const PROMPTS: any = {
  listing: {
    en: "Welcome to Nicham solar market, type the product you want in the search column or click on the microphone and say the name of the product you want, then click search. The microphone is next to the search box.",
    pidgin: "Welcome to Nicham solar market, type product for search column or click microphone talk product name, then click search.",
    ha: "Barka da zuwa kasuwar Nicham Solar. Rubuta sunan kaya a search ko danna mic ka fada suna.",
    ig: "Nnoo na ahia Nicham Solar. Pinyere aha na search ma obu pia mic kwuo aha.",
    yo: "Kaabo si oja Nicham Solar. Te oruko oja ni search tabi te mic so oruko."
  },
  order: {
    en: "You are on order page. Total price shown. Press YES button below to confirm order, or click microphone and say YES.",
    pidgin: "You don reach order page. Total price dey. Press YES button to confirm, or click mic talk YES.",
    ha: "Kana shafin oda. Jimillar kudi a kasa. Danna YES don tabbatarwa, ko danna mic ka ce YES.",
    ig: "I no na peeji iwu. Onu ego di n'okpuru. Pia YES iji kwado, ma obu pia mic si YES.",
    yo: "O wa lori oju-iwe aṣẹ. Iye owo lapapọ ni isalẹ. Tẹ YES lati jẹrisi, tabi tẹ mic ki o sọ YES."
  }
}

export default function VoiceOrder({ lang, currentMode }: { lang: string, currentMode: 'listing' | 'order' }) {
  const [isListening, setIsListening] = useState(false)
  const [response, setResponse] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)

  const getWelcome = () => {
    const modePrompts = PROMPTS[currentMode] || PROMPTS.listing
    return modePrompts[lang] || modePrompts['en'] || modePrompts.en
  }

  useEffect(() => {
    const welcome = getWelcome()
    setResponse(welcome)
  }, [lang, currentMode])

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
    if (currentMode === 'order' && voicesReady) {
      try {
        const msg = getWelcome()
        const u = new SpeechSynthesisUtterance(msg)
        u.lang = "en-NG"
        u.rate = 0.85
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(u)
      } catch {}
    }
    return () => {}
  }, [voicesReady, currentMode, lang])

  const handleMic = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) {
      alert("Voice not supported")
      return
    }
    const rec = new SR()
    rec.lang = "en-NG"
    rec.onstart = () => setIsListening(true)
    rec.onend = () => setIsListening(false)
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes("yes") && currentMode === 'order') {
        const orderId = "NCH-" + Date.now().toString().slice(-6)
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        // Get product name from URL or page
        const prodName = document.querySelector('h1')?.textContent || "Solar Product"
        const totalEl = document.querySelector('.text-3xl') || document.querySelector('[class*="text-green"]')
        const total = 150000
        orders.unshift({ productName: prodName, total, orderId, date: new Date().toLocaleString() })
        localStorage.setItem('nicham_orders', JSON.stringify(orders))
        const msg = "Order confirmed. ID " + orderId + ". Thank you."
        setResponse(msg)
        const u = new SpeechSynthesisUtterance(msg)
        window.speechSynthesis.speak(u)
        setTimeout(() => { window.location.href = "/?lang=" + lang }, 2000)
      }
    }
    rec.start()
  }

  // On listing page, mic is in search bar - no floating box
  if (currentMode === 'listing') {
    return null
  }

  // On order page - show YES confirmation voice market
  return (
    <div className={`fixed bottom-4 left-4 right-4 md:w-96 bg-white rounded-2xl shadow-2xl border-2 border-green-600 z-40 ${isMinimized ? 'p-2' : 'p-4'}`}>
      <div className="flex justify-between mb-2">
        <b className="text-sm text-green-700">Voice Market - Order Page</b>
        <button onClick={() => setIsMinimized(!isMinimized)} className="text-xs bg-gray-100 px-2 py-1 rounded">
          {isMinimized ? 'Expand' : 'Minimize'}
        </button>
      </div>
      {!isMinimized && (
        <>
          <div className="text-xs bg-green-50 p-2 rounded mb-2 border border-green-200">{response}</div>
          <button onClick={handleMic} className={`w-full py-3 rounded-full font-bold ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-green-600 text-white'}`}>
            {isListening ? 'Listening... Say YES' : 'Press & Say YES to Confirm'}
          </button>
          <div className="text-[10px] text-gray-500 mt-2 text-center">No typing needed - Just say YES or tap YES button above</div>
        </>
      )}
    </div>
  )
}
