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
    howToTitle: "HOW TO USE (Press mic before each phrase):",
    how1: "1. Press 🎤 → Say 'Solar bike' → Hear description (300kg load etc)",
    how2: "2. Press 🎤 again → Say 'YES' → Opens order page",
    how3: "3. On order page, press 🎤 → Say 'YES' again → Order confirmed with ID",
    howNote: "If you say YES without pressing mic, app cannot hear you - must press mic each time!",
    badgeSayProduct: "SAY PRODUCT NAME",
    badgePressMic: "PRESS MIC + SAY PRODUCT NAME",
    badgeAwaitOpen: "PRESS MIC + SAY YES TO OPEN ORDER PAGE",
    badgeAwaitOrder: "PRESS MIC + SAY YES TO CONFIRM ORDER",
    tryAgain: "I did not hear a product name. Press mic button again and say Solar Bike, Solar Pump, Solar Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike.",
    needMic: "Please press the microphone button before speaking. Then say YES to confirm.",
    langCode: "en-NG",
    voiceActive: true,
    voiceLabel: "VOICE EN - LISTING"
  },
  pcm: {
    welcome: "Welcome to Nicham Solar Market. Press microphone button and talk wetin you wan buy. For example, press mic and talk Solar Bike, or Solar Pump.",
    listening: "I dey listen now. Talk after beep.",
    heard: "You talk",
    productIntro: "You ask for {product}. {intro} Total price na {price} naira. To open order page, press microphone button again and talk YES. Or press mic and talk another product.",
    confirmOpen: "I dey open order page for {product} now.",
    howToTitle: "HOW TO USE AM (Press mic before you talk):",
    how1: "1. Press 🎤 → Talk 'Solar bike' → You go hear wetin e fit carry (300kg etc)",
    how2: "2. Press 🎤 again → Talk 'YES' → E go open order page",
    how3: "3. For order page, press 🎤 → Talk 'YES' again → Order go enter with ID",
    howNote: "If you talk YES without pressing mic, app no go hear you - must press mic each time!",
    badgeSayProduct: "TALK PRODUCT NAME",
    badgePressMic: "PRESS MIC + TALK PRODUCT NAME",
    badgeAwaitOpen: "PRESS MIC + TALK YES TO OPEN ORDER PAGE",
    badgeAwaitOrder: "PRESS MIC + TALK YES TO CONFIRM ORDER",
    tryAgain: "I no hear product name. Press mic again and talk Solar Bike, Solar Pump, etc.",
    needMic: "Abeg press microphone button before you talk. Then talk YES.",
    langCode: "en-NG",
    voiceActive: true,
    voiceLabel: "VOICE PCM - LISTING"
  },
  yo: {
    welcome: "Kaabo si Oja Solar Nicham. Tẹ bọtini maikirofooni ki o so ọja ti o fẹ. Fun apẹẹrẹ, tẹ mic ki o so Keke Solar, tabi Fompu Omi.",
    listening: "Mo n gbo nisinsinyi. Soro lẹhin beep.",
    heard: "O so pe",
    productIntro: "O beere fun {product}. {intro} Lapapo iye ni {price} naira. Lati ṣi oju-iwe aṣẹ, tẹ bọtini maikirofooni lẹẹkansi ki o so BẸẸNI. Tabi tẹ mic ki o so orukọ ọja miiran.",
    confirmOpen: "Mo n ṣi oju-iwe aṣẹ fun {product} nisisiyi.",
    howToTitle: "BAWO LO ṢE LE LO (Tẹ mic ṣaaju gbolohun kọọkan):",
    how1: "1. Tẹ 🎤 → So 'Keke solar' → Gbo apejuwe (ẹru 300kg ati bẹbẹ lọ)",
    how2: "2. Tẹ 🎤 lẹẹkansi → So 'BẸẸNI' → Yoo ṣi oju-iwe aṣẹ",
    how3: "3. Lori oju-iwe aṣẹ, tẹ 🎤 → So 'BẸẸNI' lẹẹkansi → Aṣẹ ti jẹrisi pẹlu ID",
    howNote: "Ti o ba so BẸẸNI laisi titẹ mic, app ko le gbo rẹ - o gbọdọ tẹ mic ni igba kọọkan!",
    badgeSayProduct: "SO ORUKO OJA",
    badgePressMic: "TẸ MIC + SO ORUKO OJA",
    badgeAwaitOpen: "TẸ MIC + SO BẸẸNI LATI ṢI OJU-IWE AṢẸ",
    badgeAwaitOrder: "TẸ MIC + SO BẸẸNI LATI JẸRISI AṢẸ",
    tryAgain: "Emi ko gbo orukọ ọja. Tẹ mic lẹẹkansi ki o so Keke Solar, Fompu Omi, Firisa Solar, ati bẹbẹ lọ.",
    needMic: "Jọwọ tẹ bọtini maikirofooni ṣaaju ki o to sọrọ. Lẹhinna so BẸẸNI.",
    langCode: "yo-NG",
    voiceActive: false,
    voiceLabel: "VOICE YO - LISTING (Text only - card needed for native voice)"
  },
  ha: {
    welcome: "Barka da zuwa Kasuwar Solar Nicham. Danna maɓallin makirufo ka faɗi kayan da kake so. Misali, danna mic ka ce Keke Solar, ko Famfon Ruwa.",
    listening: "Ina sauraro yanzu. Yi magana bayan beep.",
    heard: "Ka ce",
    productIntro: "Ka nemi {product}. {intro} Jimillar farashi {price} naira ne. Don buɗe shafin oda, danna maɓallin makirufo kuma ka ce EH. Ko danna mic ka faɗi wani kayan.",
    confirmOpen: "Ina buɗe shafin oda na {product} yanzu.",
    howToTitle: "YADDA AKE AMFANI (Danna mic kafin kowace jimla):",
    how1: "1. Danna 🎤 → Ce 'Keke solar' → Ji bayanin (nauyin 300kg da sauransu)",
    how2: "2. Danna 🎤 kuma → Ce 'EH' → Zai buɗe shafin oda",
    how3: "3. A shafin oda, danna 🎤 → Ce 'EH' kuma → An tabbatar da oda tare da ID",
    howNote: "Idan ka ce EH ba tare da danna mic ba, app ba zai ji ka ba - dole ka danna mic kowane lokaci!",
    badgeSayProduct: "FAƊI SUNAN KAYA",
    badgePressMic: "DANNA MIC + FAƊI SUNAN KAYA",
    badgeAwaitOpen: "DANNA MIC + CE EH DON BUƊE SHAFIN ODA",
    badgeAwaitOrder: "DANNA MIC + CE EH DON TABBATAR DA ODA",
    tryAgain: "Ban ji sunan kaya ba. Danna mic kuma ka ce Keke Solar, Famfon Ruwa, Firisa Solar, da sauransu.",
    needMic: "Don Allah danna maɓallin makirufo kafin ka yi magana. Sannan ka ce EH.",
    langCode: "ha-NG",
    voiceActive: false,
    voiceLabel: "VOICE HA - LISTING (Rubutu kawai - ana buƙatar kati don murya ta asali)"
  },
  ig: {
    welcome: "Nnọọ na Ahịa Solar Nicham. Pịa bọtịnụ igwe okwu wee kwuo ngwaahịa ịchọrọ. Dịka ọmụmaatụ, pịa mic wee kwuo Keke Solar, ma ọ bụ Mgbapụta Mmiri.",
    listening: "Ana m ege ntị ugbu a. Kwuo okwu mgbe beep gasịrị.",
    heard: "I kwuru",
    productIntro: "Ị rịọrọ {product}. {intro} Ọnụ ahịa niile bụ {price} naira. Iji mepee peeji iwu, pịa bọtịnụ igwe okwu ọzọ wee kwuo EE. Ma ọ bụ pịa mic kwuo ngwaahịa ọzọ.",
    confirmOpen: "Ana m emepe peeji iwu maka {product} ugbu a.",
    howToTitle: "OTU ESI EJI YA (Pịa mic tupu ahịrịokwu ọ bụla):",
    how1: "1. Pịa 🎤 → Kwuo 'Keke solar' → Nụ nkọwa (ibu 300kg wdg)",
    how2: "2. Pịa 🎤 ọzọ → Kwuo 'EE' → Ọ ga-emepe peeji iwu",
    how3: "3. Na peeji iwu, pịa 🎤 → Kwuo 'EE' ọzọ → Ekwenyela iwu na ID",
    howNote: "Ọ bụrụ na ị kwuo EE na-enweghị ịpị mic, ngwa enweghị ike ịnụ gị - ga-pịa mic oge ọ bụla!",
    badgeSayProduct: "KWUO AHA NGWAAHỊA",
    badgePressMic: "PỊA MIC + KWUO AHA NGWAAHỊA",
    badgeAwaitOpen: "PỊA MIC + KWUO EE IJI MEPHE PEEJI IWU",
    badgeAwaitOrder: "PỊA MIC + KWUO EE IJI KWENYE IWU",
    tryAgain: "Anụghị m aha ngwaahịa. Pịa mic ọzọ wee kwuo Keke Solar, Mgbapụta Mmiri, Friza Solar, wdg.",
    needMic: "Biko pịa bọtịnụ igwe okwu tupu ikwuo okwu. Mgbe ahụ kwuo EE.",
    langCode: "ig-NG",
    voiceActive: false,
    voiceLabel: "VOICE IG - LISTING (Text only - kaadị achọrọ maka olu obodo)"
  }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 },
  yo: { keke: 1, eru: 1, bike: 1, fompu: 2, omi: 2, firisa: 3, grid: 4, tirakito: 5, gbigbe: 6, kika: 9, fold: 9 },
  ha: { keke: 1, kaya: 1, bike: 1, famfo: 2, ruwa: 2, pump: 2, firiza: 3, sanyi: 3, grid: 4, mini: 4, tarikta: 5, noma: 5, bushewa: 6, kwale: 7, jirgi: 8, ninkewa: 9 },
  ig: { igwe: 1, ibu: 1, bike: 1, mmiri: 2, pump: 2, friza: 3, grid: 4, trakto: 5, nkucha: 6, ugbo: 7, mpiachi: 9, fold: 9 }
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

  useEffect(() => {
    const welcome = currentMode === 'order' 
      ? (products[0] ? `${products[0].name}: ${products[0].intro} Total ${calcTotal(products[0].basePrice).toLocaleString()} naira. Press mic and say YES to confirm.` : prompts.welcome)
      : prompts.welcome
    setResponse(welcome)
  }, [lang, currentMode])

  const speak = (text: string) => {
    if (!voicePrompts[lang]?.voiceActive) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const clean = text.replace(/NiChAm/g, 'Nicham')
      const u = new SpeechSynthesisUtterance(clean)
      u.lang = prompts.langCode
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice needs Chrome on Android.')
      return
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = lang === 'yo' || lang === 'ha' || lang === 'ig' ? 'en-NG' : prompts.langCode
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.onstart = () => { setIsListening(true); setResponse("🔴 " + prompts.listening) }
    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase()
      setTranscript(text)
      handleCommand(text)
    }
    recognitionRef.current.onend = () => setIsListening(false)
    recognitionRef.current.onerror = (e: any) => { setIsListening(false); setResponse(`Mic error: ${e.error}. ${prompts.needMic}`) }
    try { recognitionRef.current.start() } catch {}
  }

  const handleCommand = (text: string) => {
    const isYes = text.includes('yes') || text.includes('yeah') || text.includes('bẹẹni') || text.includes('eh') || text.includes('ee') || text.includes('confirm') || text.includes('beeni') || text.includes('ehen')
    const isNo = text.includes('no') || text.includes('back') || text.includes('bẹẹkọ') || text.includes("a'a") || text.includes('mba')

    if (awaiting === 'open' && lastProduct) {
      if (isYes) {
        const msg = prompts.confirmOpen.replace('{product}', lastProduct.name)
        setResponse(msg)
        if (prompts.voiceActive) speak(msg)
        setAwaiting(null)
        setTimeout(() => router.push(`/product/${lastProduct.id}?lang=${lang}&voice=ready`), 2000)
        return
      }
      if (isNo) { setAwaiting(null); setLastProduct(null); setResponse(prompts.welcome); return }
    }

    if (awaiting === 'order') {
      if (isYes) { window.dispatchEvent(new CustomEvent('voiceYesOrder')); setResponse("YES heard! Confirming..."); return }
    }

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
        const msg = prompts.productIntro.replace('{product}', productMeta.name).replace('{intro}', productMeta.intro).replace('{price}', total.toLocaleString())
        setResponse(`${prompts.heard}: "${text}" → Found: ${productMeta.name}. ${msg}`)
        if (prompts.voiceActive) speak(msg)
        setAwaiting('open')
        return
      }
    }

    if (isYes && !lastProduct && currentMode === 'listing') {
      setResponse(`You said YES but no product yet. ${prompts.needMic} First say product name like Solar Bike.`)
      return
    }

    if (isYes && currentMode === 'order') {
      window.dispatchEvent(new CustomEvent('voiceYesOrder'))
      setResponse("YES heard on order page! Confirming...")
      return
    }

    setResponse(`${prompts.heard}: "${text}". ${prompts.tryAgain}`)
    if (prompts.voiceActive) speak(prompts.tryAgain)
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 max-w-[92vw]">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-4 max-w-[380px] text-xs shadow-2xl border-2 border-yellow-400">
          <div className="text-yellow-300 font-black mb-2 flex justify-between items-center gap-2">
            <span className="text-[11px]">🎤 {prompts.voiceLabel}</span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[9px]">{awaiting ? (awaiting === 'open' ? prompts.badgeAwaitOpen : prompts.badgeAwaitOrder) : prompts.badgeSayProduct}</span>
          </div>
          {transcript && <div className="bg-gray-800 p-2 rounded mb-2">You said: "<b>{transcript}</b>"</div>}
          <div className="leading-relaxed bg-gray-900 p-2.5 rounded whitespace-pre-wrap">{response}</div>
          <div className="mt-2 text-[10px] text-yellow-100 border-t border-gray-700 pt-2 leading-relaxed">
            <div className="font-bold">{prompts.howToTitle}</div>
            <div>{prompts.how1}</div>
            <div>{prompts.how2}</div>
            <div>{prompts.how3}</div>
            <div className="mt-1 text-gray-400 italic">{prompts.howNote}</div>
          </div>
        </div>
      )}
      <button
        onClick={startListening}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-3xl transition-all ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-yellow-400 hover:bg-yellow-500'}`}
      >
        {isListening ? '🔴' : '🎤'}
      </button>
      <div className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-bold text-center max-w-[200px]">
        {isListening ? '🔴 LISTENING' : awaiting === 'open' ? prompts.badgeAwaitOpen : awaiting === 'order' ? prompts.badgeAwaitOrder : prompts.badgePressMic}
      </div>
    </div>
  )
}
