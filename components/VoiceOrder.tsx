'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const voicePrompts: any = {
  en: {
    welcome: "Welcome to NiChAm Solar Market. Say the product you want. For example, say Solar Bike, or Solar Pump, or Solar Freezer.",
    listening: "Listening... Speak now",
    heard: "I heard you say",
    productFound: "Great! Opening {product}. {intro}. It costs {price} naira. I will take you to order page. Are you ready to place order? Say yes.",
    orderPlaced: "Taking you to order page for {product}. Please confirm on the page. Thank you.",
    tryAgain: "Sorry, I did not understand. Please say Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike.",
    langCode: "en-NG",
    voiceActive: true
  },
  pcm: {
    welcome: "Welcome to NiChAm Solar Market. Talk wetin you wan buy. For example, talk Solar Bike, or Solar Pump.",
    listening: "I dey listen... Talk now",
    heard: "I hear say you talk",
    productFound: "Correct! I dey open {product}. {intro}. E cost {price} naira. I go carry you go order page. You ready to order? Talk yes.",
    orderPlaced: "I dey carry you go order page for {product}. Abeg confirm for page. Thank you.",
    tryAgain: "Sorry, I no understand. Abeg talk Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike.",
    langCode: "en-NG",
    voiceActive: true
  },
  ha: {
    welcome: "Barka da zuwa Kasuwar Solar ta NiChAm. Rubutu a shirye yake a Hausa, murya ta asali tana nan tafe. Ka ce Kekin Kaya Solar ko Famfon Ruwa.",
    listening: "Ina sauraro... (Rubutu kawai a yanzu)",
    heard: "Na ji ka ce",
    productFound: "Madalla! Ina bude {product}. Zan kai ka shafin oda. Ka shirya?",
    orderPlaced: "Ina kai ka shafin odar {product}.",
    tryAgain: "Yi hakuri, ban gane ba. Ka ce Solar Bike, Pump, Freezer.",
    langCode: "ha-NG",
    voiceActive: false
  },
  ig: {
    welcome: "Nnoo na Ahia Solar NiChAm. Ederede di njikere na Igbo, olu obodo na-abia. Kwuo Solar Bike ma obu Pump.",
    listening: "Ana m ege nti... (Ederede naanị ugbu a)",
    heard: "Anuru m",
    productFound: "O di mma! Ana m emepe {product}. Ana m akpuru gi gaa peeji iwu.",
    orderPlaced: "Ana m akpuru gi gaa peeji iwu maka {product}.",
    tryAgain: "Ndo, aghotaghị m. Kwuo Solar Bike, Pump, Freezer.",
    langCode: "ig-NG",
    voiceActive: false
  },
  yo: {
    welcome: "Kaabo si Oja Solar NiChAm. O ro ti setan ni Yoruba, ohun abinibi n bo. So Keke Eru Solar tabi Fompu Omi.",
    listening: "Mo n gbo... (Oro kikun nikan ni bayi)",
    heard: "Mo gbo pe o so",
    productFound: "O dara! Mo n si {product}. Mo ma mu o lo si oju-iwe pase. O ti setan?",
    orderPlaced: "Mo mu o lo si oju-iwe pase fun {product}.",
    tryAgain: "Ma binu, Emi ko loye. So Solar Bike, Pump, Freezer.",
    langCode: "yo-NG",
    voiceActive: false
  }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 },
  ha: { keke: 1, kaya: 1, bike: 1, famfo: 2, ruwa: 2, pump: 2, firiza: 3, sanyi: 3, grid: 4, mini: 4, tarikta: 5, noma: 5, bushewa: 6, kwale: 7, jirgi: 8, ninkewa: 9 },
  ig: { igwe: 1, ibu: 1, bike: 1, mmiri: 2, pump: 2, friza: 3, grid: 4, trakto: 5, nkucha: 6, ugbo: 7, mpiachi: 9, fold: 9 },
  yo: { keke: 1, eru: 1, bike: 1, fompu: 2, firisa: 3, grid: 4, tirakito: 5, gbigbe: 6, kika: 9, fold: 9 }
}

export default function VoiceOrder({ lang, products }: { lang: string, products: any }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [lastProduct, setLastProduct] = useState<any>(null)
  const recognitionRef = useRef<any>(null)
  const router = useRouter()

  const prompts = voicePrompts[lang] || voicePrompts.en

  useEffect(() => {
    if (prompts.voiceActive) {
      speak(prompts.welcome)
      setResponse(prompts.welcome)
    } else {
      setResponse(prompts.welcome + " (Text ready, native voice - card needed)")
    }
  }, [lang])

  const speak = (text: string) => {
    const isActive = voicePrompts[lang]?.voiceActive
    if (!isActive) {
      console.log("Voice not active for lang:", lang, "- text mode only until card purchased")
      return
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = prompts.langCode
      utterance.rate = 0.9
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
    if (text.includes('yes') || text.includes('eh') || text.includes('ee') || text.includes('bẹẹni') || text.includes('bẹẹ')) {
      if (lastProduct) {
        const url = `/product/${lastProduct.id}?lang=${lang}&voice=yes`
        router.push(url)
        const msg = prompts.orderPlaced.replace('{product}', lastProduct.name)
        setResponse(msg)
        if (prompts.voiceActive) speak(msg)
        return
      }
    }
    if (text.includes('no') || text.includes("a'a") || text.includes('mba') || text.includes('bẹẹkọ')) {
      const msg = prompts.welcome
      setResponse(msg)
      if (prompts.voiceActive) speak(msg)
      return
    }

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
        const msg = prompts.productFound.replace('{product}', productMeta.name).replace('{intro}', productMeta.intro).replace('{price}', productMeta.basePrice.toLocaleString())
        setResponse(`${prompts.heard}: "${text}". ${msg} Say YES to open order page.`)
        if (prompts.voiceActive) {
          speak(msg)
          setTimeout(() => {
            const url = `/product/${productMeta.id}?lang=${lang}&voice=auto`
            router.push(url)
          }, 4000)
        } else {
          setTimeout(() => {
            const url = `/product/${productMeta.id}?lang=${lang}&voice=auto`
            router.push(url)
          }, 2000)
        }
      }
    } else {
      setResponse(`${prompts.heard}: "${text}". ${prompts.tryAgain}`)
      if (prompts.voiceActive) speak(prompts.tryAgain)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-3 max-w-[320px] text-xs shadow-2xl border border-yellow-400">
          <div className="text-yellow-300 font-bold mb-1">🎤 Voice Order - {lang.toUpperCase()} {prompts.voiceActive ? '(Voice Active)' : '(Text only - card needed for native voice)'}</div>
          {transcript && <div className="text-gray-300">You said: "{transcript}"</div>}
          <div className="mt-1">{response}</div>
          <div className="mt-2 text-[10px] text-gray-500">Voice transcript saved for Nigerian LLM data. Lang: {lang} | Orders to: /product/ID?lang={lang}</div>
        </div>
      )}
      <button
        onClick={startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-2xl transition-all ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-yellow-400 hover:bg-yellow-500'}`}
      >
        {isListening ? '🔴' : '🎤'}
      </button>
      <div className="bg-black text-white text-[10px] px-2 py-1 rounded-full">{isListening ? 'Listening...' : 'Tap to speak - No typing'}</div>
    </div>
  )
}
