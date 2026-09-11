'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const voicePrompts: any = {
  en: {
    welcome: "Welcome to NiChAm Solar Market. Say the product you want. For example, say Solar Bike, Solar Pump, or Solar Freezer.",
    listening: "Listening, speak now",
    heard: "You said",
    productIntro: "Great! You asked for {product}. {intro} This is {sourced}. Total price is {price} naira including all fees. Should I open the order page for you? Say yes to continue, or say another product.",
    confirmOpen: "Opening order page for {product} now.",
    orderPageReady: "You are on the order page for {product}. {intro} Price total {price} naira. Ready to place order? Say yes to confirm order, or no to go back.",
    orderConfirmed: "Order confirmed! Your order ID is {orderId}. Your money is safe in MTN MoMo Escrow. AfricanIES will source and deliver. You will get SMS with tracking. Thank you.",
    tryAgain: "Sorry, I did not hear a product name. Please say Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe Kit, Boat, or Foldable Bike.",
    langCode: "en-NG",
    voiceActive: true
  },
  pcm: {
    welcome: "Welcome to NiChAm Solar Market. Talk wetin you wan buy. For example, talk Solar Bike, or Solar Pump, or Solar Freezer.",
    listening: "I dey listen, talk now",
    heard: "You talk",
    productIntro: "Correct! You ask for {product}. {intro} Na {sourced}. Total price na {price} naira including everything. Make I open order page for you? Talk yes to continue, or talk another product.",
    confirmOpen: "I dey open order page for {product} now.",
    orderPageReady: "You dey order page for {product} now. {intro} Price total na {price} naira. You ready to place order? Talk yes to confirm, or no to go back.",
    orderConfirmed: "Order don enter! Your Order ID na {orderId}. Your money dey safe for MTN MoMo Escrow. AfricanIES go find and deliver. You go get SMS with tracking. Thank you.",
    tryAgain: "Sorry, I no hear product name. Abeg talk Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike.",
    langCode: "en-NG",
    voiceActive: true
  },
  ha: { welcome: "Barka da zuwa Kasuwar Solar ta NiChAm. Rubutu a shirye yake a Hausa, murya ta asali tana nan tafe.", listening: "Ina sauraro", heard: "Na ji", productIntro: "{product}. {intro} Farashin {price} naira. Bude shafin oda? Ka ce eh.", confirmOpen: "Ina bude shafin oda na {product}", orderPageReady: "Kana shafin oda na {product}. {intro}", orderConfirmed: "An tabbatar da oda! ID {orderId}", tryAgain: "Ban ji sunan kaya ba", langCode: "ha-NG", voiceActive: false },
  ig: { welcome: "Nnoo na Ahia Solar NiChAm. Ederede di njikere.", listening: "Ana m ege nti", heard: "Anuru m", productIntro: "{product}. {intro} Onu ahia {price} naira. Mepee peeji iwu? Kwuo ee.", confirmOpen: "Ana m emepe peeji iwu maka {product}", orderPageReady: "I no na peeji iwu maka {product}. {intro}", orderConfirmed: "Ekwenyela iwu! ID {orderId}", tryAgain: "Anughi m aha ngwaahia", langCode: "ig-NG", voiceActive: false },
  yo: { welcome: "Kaabo si Oja Solar NiChAm. O ro ti setan.", listening: "Mo n gbo", heard: "Mo gbo", productIntro: "{product}. {intro} Iye {price} naira. Si oju-iwe pase? So beeni.", confirmOpen: "Mo n si oju-iwe pase fun {product}", orderPageReady: "O wa ni oju-iwe pase fun {product}. {intro}", orderConfirmed: "A ti jersi pase! ID {orderId}", tryAgain: "Emi ko gbo oruko oja", langCode: "yo-NG", voiceActive: false }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 },
  ha: { keke: 1, kaya: 1, bike: 1, famfo: 2, ruwa: 2, pump: 2, firiza: 3, sanyi: 3, grid: 4, mini: 4, tarikta: 5, noma: 5, bushewa: 6, kwale: 7, jirgi: 8, ninkewa: 9 },
  ig: { igwe: 1, ibu: 1, bike: 1, mmiri: 2, pump: 2, friza: 3, grid: 4, trakto: 5, nkucha: 6, ugbo: 7, mpiachi: 9, fold: 9 },
  yo: { keke: 1, eru: 1, bike: 1, fompu: 2, firisa: 3, grid: 4, tirakito: 5, gbigbe: 6, kika: 9, fold: 9 }
}

function calcTotal(base: number) {
  const pf = Math.round(base * 0.10)
  const vat = Math.round(pf * 0.075)
  const esc = Math.round(base * 0.02)
  const gp = Math.round(base * 0.01)
  return base + pf + vat + esc + gp
}

export default function VoiceOrder({ lang, products }: { lang: string, products: any }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [lastProduct, setLastProduct] = useState<any>(null)
  const [awaitingConfirm, setAwaitingConfirm] = useState<'open' | 'order' | null>(null)
  const recognitionRef = useRef<any>(null)
  const router = useRouter()

  const prompts = voicePrompts[lang] || voicePrompts.en

  useEffect(() => {
    // Fix: Say NiChAm as word, not N I C H A M - no spaces, slower rate
    const welcomeMsg = prompts.welcome.replace(/N\s*I\s*C\s*H\s*A\s*M/gi, 'NiChAm')
    if (prompts.voiceActive) {
      speak(welcomeMsg)
      setResponse(welcomeMsg)
    } else {
      setResponse(welcomeMsg + " (Text ready, native voice card needed)")
    }
  }, [lang])

  const speak = (text: string) => {
    const isActive = voicePrompts[lang]?.voiceActive
    if (!isActive) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      // Fix N I C H A M spelling issue - replace with NiChAm
      const cleanText = text.replace(/N\s*I\s*C\s*H\s*A\s*M/gi, 'Nicham').replace(/NICHAM/gi, 'Nicham')
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = prompts.langCode
      utterance.rate = 0.88
      utterance.pitch = 1
      const voices = window.speechSynthesis.getVoices()
      const ngVoice = voices.find((v: any) => v.lang.includes('en-NG')) || voices.find((v: any) => v.lang.includes('en')) 
      if (ngVoice) utterance.voice = ngVoice
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice not supported. Use Chrome on Android.')
      return
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = prompts.langCode
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setResponse(prompts.listening)
      if (prompts.voiceActive) speak(prompts.listening)
    }

    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase()
      setTranscript(text)
      handleVoiceCommand(text)
    }

    recognitionRef.current.onend = () => setIsListening(false)
    recognitionRef.current.onerror = () => {
      setIsListening(false)
      setResponse(prompts.tryAgain)
      if (prompts.voiceActive) speak(prompts.tryAgain)
    }

    recognitionRef.current.start()
  }

  const handleVoiceCommand = (text: string) => {
    // YES / NO handling for two-step flow
    const isYes = text.includes('yes') || text.includes('yeah') || text.includes('yep') || text.includes('correct') || text.includes('open')
    const isNo = text.includes('no') || text.includes("a'a") || text.includes('mba') || text.includes('bẹẹkọ') || text.includes('back')

    if (awaitingConfirm === 'open' && lastProduct) {
      if (isYes) {
        const total = calcTotal(lastProduct.basePrice)
        const confirmMsg = prompts.confirmOpen.replace('{product}', lastProduct.name)
        setResponse(confirmMsg)
        if (prompts.voiceActive) speak(confirmMsg)
        setAwaitingConfirm(null)
        setTimeout(() => {
          router.push(`/product/${lastProduct.id}?lang=${lang}&voice=ready&name=${encodeURIComponent(lastProduct.name)}`)
        }, 2500)
        return
      }
      if (isNo) {
        setAwaitingConfirm(null)
        const msg = prompts.welcome
        setResponse(msg)
        if (prompts.voiceActive) speak(msg)
        return
      }
    }

    if (awaitingConfirm === 'order' && lastProduct) {
      if (isYes) {
        // Will be handled on order page, but also allow confirm here
        router.push(`/product/${lastProduct.id}?lang=${lang}&voice=confirm`)
        return
      }
    }

    // Find product by keyword
    const keywords = productKeywords[lang] || productKeywords.en
    const keywordsEn = productKeywords.en
    let foundId = null
    for (const [key, id] of Object.entries(keywords)) {
      if (text.includes(key)) { foundId = id; break }
    }
    if (!foundId) {
      for (const [key, id] of Object.entries(keywordsEn)) {
        if (text.includes(key)) { foundId = id; break }
      }
    }

    if (foundId) {
      const productMeta = products.find((p: any) => p.id === foundId)
      if (productMeta) {
        setLastProduct(productMeta)
        const total = calcTotal(productMeta.basePrice)
        // Now describe product fully BEFORE opening - this is what user asked: tell load capacity 200kg etc
        const msg = prompts.productIntro
          .replace('{product}', productMeta.name)
          .replace('{intro}', productMeta.intro)
          .replace('{sourced}', productMeta.sourced || 'Sourced by AfricanIES')
          .replace('{price}', total.toLocaleString())
        
        setResponse(`${prompts.heard}: "${text}". ${msg}`)
        if (prompts.voiceActive) speak(msg)
        setAwaitingConfirm('open')
        // Do NOT auto-navigate - wait for YES per your instruction
      }
    } else {
      setResponse(`${prompts.heard}: "${text}". ${prompts.tryAgain}`)
      if (prompts.voiceActive) speak(prompts.tryAgain)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-3 max-w-[340px] text-xs shadow-2xl border border-yellow-400">
          <div className="text-yellow-300 font-bold mb-1">🎤 Voice - {lang.toUpperCase()} {prompts.voiceActive ? '(Active)' : '(Text only)'} {awaitingConfirm ? `→ Awaiting YES to ${awaitingConfirm}` : ''}</div>
          {transcript && <div className="text-gray-300">You said: "{transcript}"</div>}
          <div className="mt-1 leading-relaxed">{response}</div>
          <div className="mt-2 text-[10px] text-gray-500">Flow: Say product → Hear description (load, etc) → Say YES → Opens order page → Say YES again → Order confirmed. No repeat welcome.</div>
        </div>
      )}
      <button
        onClick={startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-2xl transition-all ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-yellow-400 hover:bg-yellow-500'}`}
      >
        {isListening ? '🔴' : '🎤'}
      </button>
      <div className="bg-black text-white text-[10px] px-2 py-1 rounded-full">{isListening ? 'Listening...' : awaitingConfirm ? `Say YES to ${awaitingConfirm}` : 'Tap to speak - No typing'}</div>
    </div>
  )
}
