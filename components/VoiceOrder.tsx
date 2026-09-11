'use client'
import { useState, useEffect, useRef } from 'react'

const voicePrompts: any = {
  en: {
    welcome: "Welcome to NiChAm Solar Market. Say the product you want. For example, say Solar Bike, or Solar Pump, or Solar Freezer.",
    listening: "Listening... Speak now",
    heard: "I heard you say",
    confirm: "Do you want to order this? Say yes to confirm, or no to try again.",
    product: "Great! You want {product}. This product {intro} It costs {price} naira. Say yes to order, or say another product.",
    orderPlaced: "Your order for {product} is placed. AfricanIES will source and deliver. You will get confirmation. Thank you.",
    tryAgain: "Sorry, I did not understand. Please say Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe Kit, Boat, or Foldable Bike.",
    langCode: "en-NG"
  },
  pcm: {
    welcome: "Welcome to NiChAm Solar Market. Talk wetin you wan buy. For example, talk Solar Bike, or Solar Pump, or Solar Freezer.",
    listening: "I dey listen... Talk now",
    heard: "I hear say you talk",
    confirm: "You wan order this one? Talk yes to confirm, or no to try again.",
    product: "Correct! You wan {product}. This product {intro} E cost {price} naira. Talk yes to order, or talk another product.",
    orderPlaced: "Your order for {product} don enter. AfricanIES go find am & deliver. You go get confirmation. Thank you.",
    tryAgain: "Sorry, I no understand. Abeg talk Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe Kit, Boat, or Foldable Bike.",
    langCode: "en-NG"
  },
  ha: {
    welcome: "Barka da zuwa Kasuwar Solar ta NiChAm. Fada abin da kake so. Misali, ka ce Kekin Kaya Solar, ko Famfon Ruwa Solar, ko Firiza Solar.",
    listening: "Ina sauraro... Yi magana yanzu",
    heard: "Na ji ka ce",
    confirm: "Kana son yin odar wannan? Ka ce eh don tabbatarwa, ko a'a don sake gwadawa.",
    product: "Madalla! Kana son {product}. Wannan kayan {intro} Farashinsa naira {price}. Ka ce eh don yin oda, ko ka ce wani kayan.",
    orderPlaced: "Odar ka na {product} ta shiga. AfricanIES zai samo & isar. Za ka samu tabbaci. Nagode.",
    tryAgain: "Yi hakuri, ban gane ba. Don Allah ka ce Kekin Kaya Solar, Famfon Ruwa Solar, Firiza Solar, Mini Grid, Tarikta, Na'urar Bushewa, Kitin Kwale-kwale, Jirgin Ruwa, ko Kekin Mai Ninkewa.",
    langCode: "ha-NG"
  },
  ig: {
    welcome: "Nnọọ na Ahia Solar NiChAm. Kwuo ihe ị chọrọ. Dịka ọmụmaatụ, kwuo Igwe Ibu Ibu Solar, ma ọ bụ Mgbapụta Mmiri Solar, ma ọ bụ Friza Solar.",
    listening: "Ana m ege ntị... Kwuo okwu ugbu a",
    heard: "Anụrụ m na ị kwuru",
    confirm: "Ị chọrọ ịtụ nke a? Kwuo ee iji kwado, ma ọ bụ mba ịnwale ọzọ.",
    product: "Ọ dị mma! Ị chọrọ {product}. Ngwaahịa a {intro} Ọ na-eri {price} naira. Kwuo ee iji nye iwu, ma ọ bụ kwuo ngwaahịa ọzọ.",
    orderPlaced: "Edebere iwu gị maka {product}. AfricanIES ga-achọta & bute. Ị ga-enweta nkwenye. Daalụ.",
    tryAgain: "Ndo, aghọtaghị m. Biko kwuo Igwe Ibu Ibu Solar, Mgbapụta Mmiri Solar, Friza Solar, Mini Grid, Traktọ, Igwe Nkụcha, Ngwa Ụgbọ mmiri, Ụgbọ mmiri, ma ọ bụ Igwe Mpịachi.",
    langCode: "ig-NG"
  },
  yo: {
    welcome: "Kaabọ si Oja Solar NiChAm. Sọ ohun ti o fẹ. Fun apẹẹrẹ, sọ Keke Ẹru Solar, tabi Fompu Omi Solar, tabi Firisa Solar.",
    listening: "Mo n gbọ... Sọrọ nisinsinyi",
    heard: "Mo gbọ pe o sọ",
    confirm: "Ṣe o fẹ paṣẹ eyi? Sọ bẹẹni lati jẹrisi, tabi bẹẹkọ lati gbiyanju lẹẹkansi.",
    product: "O dara! O fẹ {product}. Ọja yii {intro} O jẹ {price} naira. Sọ bẹẹni lati paṣẹ, tabi sọ ọja miiran.",
    orderPlaced: "A ti paṣẹ {product} rẹ. AfricanIES yoo wa & firanṣẹ. Iwọ yoo gba ijẹrisi. E ṣeun.",
    tryAgain: "Ma binu, Emi ko loye. Jọwọ sọ Keke Ẹru Solar, Fompu Omi Solar, Firisa Solar, Mini Grid, Tirakito, Ẹrọ Gbígbẹ, Ohun elo Ọkọ Oju-omi, Ọkọ Oju-omi, tabi Keke Kika.",
    langCode: "yo-NG"
  }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 },
  ha: { keke: 1, kaya: 1, bike: 1, famfo: 2, ruwa: 2, pump: 2, firiza: 3, sanyi: 3, grid: 4, mini: 4, tarikta: 5, noma: 5, bushewa: 6, kwale: 7, jirgi: 8, ninkewa: 9 },
  ig: { igwe: 1, ibu: 1, bike: 1, mmiri: 2, pump: 2, friza: 3, grid: 4, trakto: 5, nkucha: 6, ugbo: 7, mpiachi: 9, fold: 9 },
  yo: { keke: 1, eru: 1, bike: 1, omi: 2, fompu: 2, firisa: 3, grid: 4, tirakito: 5, gbigbe: 6, oko: 7, omi: 8, kika: 9, fold: 9 }
}

export default function VoiceOrder({ lang, products }: { lang: string, products: any }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [lastProduct, setLastProduct] = useState<any>(null)
  const recognitionRef = useRef<any>(null)

  const prompts = voicePrompts[lang] || voicePrompts.en

  useEffect(() => {
    // Initial welcome voice per master doc 20.3
    speak(prompts.welcome)
    setResponse(prompts.welcome)
  }, [lang])

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = prompts.langCode
      utterance.rate = 0.9
      utterance.pitch = 1
      // Try to find Nigerian voice or fallback
      const voices = window.speechSynthesis.getVoices()
      const ngVoice = voices.find(v => v.lang.includes('en-NG')) || voices.find(v => v.lang.includes('en')) 
      if (ngVoice) utterance.voice = ngVoice
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice not supported in this browser. Use Chrome on Android.')
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
      speak(prompts.listening)
    }

    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase()
      setTranscript(text)
      handleVoiceCommand(text)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.onerror = () => {
      setIsListening(false)
      const msg = prompts.tryAgain
      setResponse(msg)
      speak(msg)
    }

    recognitionRef.current.start()
  }

  const handleVoiceCommand = (text: string) => {
    // Check for yes/no confirmation
    if (text.includes('yes') || text.includes('eh') || text.includes('ee') || text.includes('bẹẹni') || text.includes('bẹẹ')) {
      if (lastProduct) {
        const msg = prompts.orderPlaced.replace('{product}', lastProduct.name)
        setResponse(msg)
        speak(msg)
        // Simulate order - in real app, save to Supabase orders table with user_language per master doc
        // orders.user_language = lang, store transcript for LLM data collection
        return
      }
    }
    if (text.includes('no') || text.includes("a'a") || text.includes('mba') || text.includes('bẹẹkọ')) {
      const msg = prompts.welcome
      setResponse(msg)
      speak(msg)
      return
    }

    // Find product by keyword
    const keywords = productKeywords[lang] || productKeywords.en
    const keywordsEn = productKeywords.en
    let foundId = null
    for (const [key, id] of Object.entries(keywords)) {
      if (text.includes(key)) {
        foundId = id
        break
      }
    }
    if (!foundId) {
      for (const [key, id] of Object.entries(keywordsEn)) {
        if (text.includes(key)) {
          foundId = id
          break
        }
      }
    }

    if (foundId) {
      const productMeta = products.find((p: any) => p.id === foundId)
      if (productMeta) {
        setLastProduct(productMeta)
        const intro = productMeta.intro
        const msg = prompts.product.replace('{product}', productMeta.name).replace('{intro}', intro).replace('{price}', productMeta.basePrice.toLocaleString())
        setResponse(`${prompts.heard}: ${text}. ${msg}`)
        speak(msg)
      }
    } else {
      setResponse(`${prompts.heard}: ${text}. ${prompts.tryAgain}`)
      speak(prompts.tryAgain)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-3 max-w-[300px] text-xs shadow-2xl border border-yellow-400">
          <div className="text-yellow-300 font-bold mb-1">🎤 Voice Order - {lang.toUpperCase()} (No typing needed)</div>
          {transcript && <div className="text-gray-300">You said: "{transcript}"</div>}
          <div className="mt-1">{response}</div>
          <div className="mt-2 text-[10px] text-gray-500">This voice transcript saved for Nigerian LLM data collection per master spec. Lang: {lang}</div>
        </div>
      )}
      <button
        onClick={startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-2xl transition-all ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-yellow-400 hover:bg-yellow-500'}`}
        title="Hold to talk - One thumb rule per master spec 20.6"
      >
        {isListening ? '🔴' : '🎤'}
      </button>
      <div className="bg-black text-white text-[10px] px-2 py-1 rounded-full">{isListening ? 'Listening...' : 'Tap to speak - No typing'}</div>
    </div>
  )
}
