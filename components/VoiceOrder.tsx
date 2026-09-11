'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const voicePrompts: any = {
  en: {
    welcome: "Welcome to Nicham Solar Market. Press the microphone button and say the product you want. For example, press mic and say Solar Bike, or Solar Pump.",
    listening: "Listening now. Speak after the beep.",
    heard: "You said",
    productIntro: "You asked for {product}. {intro} Total price is {price} naira. To open order page, press the microphone button again and say YES. Or press mic and say another product name.",
    confirmOpen: "Opening order page for {product} now.",
    orderPageReady: "You are on order page for {product}. {intro} Total price {price} naira. To confirm order, press the microphone button below and say YES. Or tap the green YES button.",
    orderConfirmed: "Order confirmed! Order ID {orderId}. Money safe in MoMo Escrow. AfricanIES will deliver. You will get SMS. Thank you.",
    tryAgain: "I did not hear a product name. Press mic button again and say Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike. Remember to press mic before speaking.",
    needMic: "Please press the microphone button before speaking. Then say YES to confirm.",
    langCode: "en-NG",
    voiceActive: true
  },
  pcm: {
    welcome: "Welcome to Nicham Solar Market. Press microphone button and talk wetin you wan buy. For example, press mic and talk Solar Bike, or Solar Pump.",
    listening: "I dey listen now. Talk after beep.",
    heard: "You talk",
    productIntro: "You ask for {product}. {intro} Total price na {price} naira. To open order page, press microphone button again and talk YES. Or press mic and talk another product.",
    confirmOpen: "I dey open order page for {product} now.",
    orderPageReady: "You dey order page for {product} now. {intro} Price na {price} naira total. To confirm order, press microphone button below and talk YES. Or tap green YES button.",
    orderConfirmed: "Order don enter! Order ID na {orderId}. Money dey safe for MoMo. AfricanIES go deliver. You go get SMS. Thank you.",
    tryAgain: "I no hear product name. Press mic button again and talk Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike. Remember to press mic before you talk.",
    needMic: "Abeg press microphone button before you talk. Then talk YES to confirm.",
    langCode: "en-NG",
    voiceActive: true
  }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 }
}

function calcTotal(base: number) {
  const pf = Math.round(base * 0.10); const vat = Math.round(pf * 0.075); const esc = Math.round(base * 0.02); const gp = Math.round(base * 0.01)
  return base + pf + vat + esc + gp
}

export default function VoiceOrder({ lang, products, mode }: { lang: string, products: any, mode?: 'listing' | 'order' }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [lastProduct, setLastProduct] = useState<any>(null)
  const [awaiting, setAwaiting] = useState<'open' | 'order' | null>(null)
  const recognitionRef = useRef<any>(null)
  const router = useRouter()
  const currentMode = mode || 'listing'

  const prompts = voicePrompts[lang] || voicePrompts.en
  const enPrompts = voicePrompts.en

  useEffect(() => {
    // Initial welcome - FIX: say Nicham as one word
    const welcome = currentMode === 'order' 
      ? (products[0] ? `You are on order page for ${products[0].name}. ${products[0].intro} Total price ${calcTotal(products[0].basePrice).toLocaleString()} naira. To confirm, press microphone button and say YES, or tap green YES button.` : prompts.welcome)
      : prompts.welcome
    setResponse(welcome)
    if (prompts.voiceActive && currentMode === 'listing') {
      setTimeout(() => speak(welcome), 800)
    }
  }, [lang, currentMode])

  const speak = (text: string) => {
    if (!voicePrompts[lang]?.voiceActive) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const clean = text.replace(/NiChAm/g, 'Nicham').replace(/N\s*I\s*C\s*H\s*A\s*M/g, 'Nicham')
      const u = new SpeechSynthesisUtterance(clean)
      u.lang = prompts.langCode
      u.rate = 0.85
      u.pitch = 1
      window.speechSynthesis.speak(u)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice needs Chrome on Android. Please use Chrome.')
      return
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = prompts.langCode
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setResponse("🔴 " + prompts.listening + " - Speak now after you see red button")
    }

    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase()
      setTranscript(text)
      handleCommand(text)
    }

    recognitionRef.current.onend = () => setIsListening(false)
    recognitionRef.current.onerror = (e: any) => {
      setIsListening(false)
      setResponse(`Mic error: ${e.error}. Press mic again and try. Remember to allow microphone permission.`)
    }

    try { recognitionRef.current.start() } catch {}
  }

  const handleCommand = (text: string) => {
    const isYes = text.includes('yes') || text.includes('yeah') || text.includes('yep') || text.includes('jes') || text.includes('confirm') || text.includes('order')
    const isNo = text.includes('no') || text.includes('back') || text.includes('cancel')

    // If awaiting YES to open order page (listing page flow)
    if (awaiting === 'open' && lastProduct) {
      if (isYes) {
        const msg = prompts.confirmOpen.replace('{product}', lastProduct.name)
        setResponse(msg + " Pressing mic not needed now, navigating...")
        speak(msg)
        setAwaiting(null)
        setTimeout(() => router.push(`/product/${lastProduct.id}?lang=${lang}&voice=ready`), 2000)
        return
      }
      if (isNo) {
        setAwaiting(null)
        setLastProduct(null)
        const msg = prompts.welcome
        setResponse(msg + " (Said NO, back to product search)")
        speak(msg)
        return
      }
      // If said another product while awaiting YES, treat as new product
    }

    // If awaiting YES to confirm order (order page flow) - handled by order page itself, but also here
    if (awaiting === 'order') {
      if (isYes) {
        // Trigger order confirmation via custom event
        window.dispatchEvent(new CustomEvent('voiceYesOrder'))
        setResponse("YES heard! Confirming order now... Press mic not needed, order processing")
        return
      }
      if (isNo) {
        setAwaiting(null)
        setResponse("Said NO, order not placed. Say product name again or go back.")
        return
      }
    }

    // Product search - FIXED: must press mic before speaking, now we search correctly
    let foundId = null
    for (const [key, id] of Object.entries(productKeywords[lang] || productKeywords.en)) {
      if (text.includes(key)) { foundId = id; break }
    }
    if (!foundId) {
      for (const [key, id] of Object.entries(productKeywords.en)) {
        if (text.includes(key)) { foundId = id; break }
      }
    }

    if (foundId) {
      const productMeta = products.find((p: any) => p.id === foundId)
      if (productMeta) {
        setLastProduct(productMeta)
        const total = calcTotal(productMeta.basePrice)
        const msg = prompts.productIntro
          .replace('{product}', productMeta.name)
          .replace('{intro}', productMeta.intro)
          .replace('{price}', total.toLocaleString())
        
        setResponse(`You said: "${text}" → Found: ${productMeta.name}. ${msg}`)
        speak(msg)
        setAwaiting('open')
        return
      }
    }

    // If YES said but no product stored - this was the bug user saw!
    if (isYes && !lastProduct && currentMode === 'listing') {
      setResponse(`You said YES but no product selected yet. First press mic and say product name like Solar Bike. Then press mic again and say YES. ${prompts.needMic}`)
      speak(prompts.needMic)
      return
    }

    if (isYes && currentMode === 'order') {
      window.dispatchEvent(new CustomEvent('voiceYesOrder'))
      setResponse("YES heard on order page! Confirming...")
      return
    }

    // No product found
    setResponse(`You said: "${text}". ${prompts.tryAgain}`)
    speak(prompts.tryAgain)
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 max-w-[90vw]">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-4 max-w-[360px] text-xs shadow-2xl border-2 border-yellow-400">
          <div className="text-yellow-300 font-black mb-2 flex justify-between">
            <span>🎤 VOICE {lang.toUpperCase()} - {currentMode.toUpperCase()}</span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px]">{awaiting ? `AWAITING YES FOR ${awaiting.toUpperCase()}` : 'SAY PRODUCT NAME'}</span>
          </div>
          {transcript && <div className="bg-gray-800 p-2 rounded mb-2">You said: "<b>{transcript}</b>"</div>}
          <div className="leading-relaxed bg-gray-900 p-2 rounded">{response}</div>
          <div className="mt-2 text-[10px] text-yellow-200 border-t border-gray-700 pt-2">
            <div className="font-bold">HOW TO USE (Press mic before each phrase):</div>
            <div>1. Press 🎤 → Say "Solar bike" → Hear description (300kg load etc)</div>
            <div>2. Press 🎤 again → Say "YES" → Opens order page</div>
            <div>3. On order page, press 🎤 → Say "YES" again → Order confirmed with ID</div>
            <div className="mt-1 text-gray-400">If you say YES without pressing mic, app cannot hear you - must press mic each time!</div>
          </div>
        </div>
      )}
      <button
        onClick={startListening}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-3xl transition-all ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-yellow-400 hover:bg-yellow-500 animate-bounce'}`}
      >
        {isListening ? '🔴' : '🎤'}
      </button>
      <div className="bg-black text-white text-xs px-3 py-1 rounded-full font-bold">
        {isListening ? '🔴 LISTENING - SPEAK NOW' : awaiting === 'open' ? 'PRESS MIC + SAY YES TO OPEN ORDER PAGE' : awaiting === 'order' ? 'PRESS MIC + SAY YES TO CONFIRM ORDER' : 'PRESS MIC + SAY PRODUCT NAME'}
      </div>
    </div>
  )
}
