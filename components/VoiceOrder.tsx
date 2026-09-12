'use client'
import { useState, useEffect } from 'react'

export default function VoiceOrder({ lang, currentMode }: { lang: string, currentMode: 'listing' | 'order' }) {
  const [isListening, setIsListening] = useState(false)
  const [response, setResponse] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)

  const getListingWelcome = () => "Welcome to Nicham solar market, type the product you want in the search column or click on the microphone and say the name of the product you want, then click search. The microphone is next to the search box."
  const getOrderWelcome = () => "You are on order page. Total price shown. Press YES button below to confirm order, or click microphone and say YES."

  useEffect(() => {
    if (currentMode === 'listing') setResponse(getListingWelcome())
    else setResponse(getOrderWelcome())
  }, [lang, currentMode])

  useEffect(() => {
    const load = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis.getVoices().length > 0) setVoicesReady(true)
    }
    load()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = load
    }
    const t = setTimeout(() => setVoicesReady(true), 1500)
    return () => { clearTimeout(t) }
  }, [])

  useEffect(() => {
    if (voicesReady) {
      try {
        const msg = currentMode === 'listing' ? getListingWelcome() : getOrderWelcome()
        // Auto speak welcome on both pages
        if (currentMode === 'order' || currentMode === 'listing') {
          window.speechSynthesis.cancel()
          const u = new SpeechSynthesisUtterance(msg)
          u.lang = "en-NG"
          u.rate = 0.85
          window.speechSynthesis.speak(u)
        }
      } catch {}
    }
    return () => {}
  }, [voicesReady, currentMode])

  const handleMic = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) { alert("Voice not supported"); return }
    const rec = new SR()
    rec.lang = "en-NG"
    rec.onstart = () => setIsListening(true)
    rec.onend = () => setIsListening(false)
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes("yes") && currentMode === 'order') {
        const orderId = "NCH-" + Date.now().toString().slice(-6)
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        const prodName = document.querySelector('h1')?.textContent || "Solar Product"
        orders.unshift({ productName: prodName, total: 150000, orderId, date: new Date().toLocaleString() })
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

  if (currentMode === 'listing') {
    return null
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:w-96 bg-white rounded-2xl shadow-2xl border-2 border-green-600 z-40 ${isMinimized ? 'p-2' : 'p-4'}`}>
      <div className="flex justify-between mb-2">
        <b className="text-sm text-green-700">Voice Market - Order Page</b>
        <button onClick={() => setIsMinimized(!isMinimized)} className="text-xs bg-gray-100 px-2 py-1 rounded">{isMinimized ? 'Expand' : 'Minimize'}</button>
      </div>
      {!isMinimized && (
        <>
          <div className="text-xs bg-green-50 p-2 rounded mb-2 border border-green-200">{response}</div>
          <button onClick={handleMic} className={`w-full py-3 rounded-full font-bold ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-green-600 text-white'}`}>
            {isListening ? 'Listening... Say YES' : 'Press & Say YES to Confirm'}
          </button>
        </>
      )}
    </div>
  )
}
