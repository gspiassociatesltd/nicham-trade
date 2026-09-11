'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const voicePrompts: any = {
  en: {
    welcome: "Welcome to Nicham Solar Market. You can click any product below to see details, or press the microphone button and say the product you want. For example, click Solar Bike or press mic and say Solar Bike.",
    listening: "Listening now. Speak after the beep.",
    heard: "You said",
    productIntro: "You asked for {product}. {intro} Total price is {price} naira. I will scroll to show you the picture. To open order page, press the microphone button again and say YES, or click the product.",
    confirmOpen: "Opening order page for {product} now.",
    howToTitle: "HOW TO USE - Click or Talk:",
    how1: "1. CLICK any product picture below, OR press 🎤 and say 'Solar bike' - I will scroll to show you the picture and describe what it can do (load, etc)",
    how2: "2. Then press 🎤 again and say 'YES' - or click Order button - to open order page",
    how3: "3. On order page, press 🎤 and say 'YES' again, or tap green YES button - Order confirmed with ID",
    howNote: "Must press mic before each voice phrase. Welcome message plays once on page load.",
    badgeSayProduct: "SAY PRODUCT NAME OR CLICK ITEM",
    badgePressMic: "CLICK ITEM OR PRESS MIC + SAY PRODUCT NAME",
    badgeAwaitOpen: "PRESS MIC + SAY YES OR CLICK ITEM TO OPEN ORDER PAGE",
    badgeAwaitOrder: "PRESS MIC + SAY YES OR TAP YES BUTTON TO CONFIRM",
    tryAgain: "I did not hear product name. You can click any item below, or press mic and say Solar Bike, Pump, Freezer, Mini Grid, Tractor, Dryer, Canoe, Boat, or Foldable Bike.",
    needMic: "Please press microphone button before speaking. Or click the product directly.",
    langCode: "en-NG",
    voiceActive: true,
    voiceLabel: "VOICE EN - LISTING"
  },
  pcm: {
    welcome: "Welcome to Nicham Solar Market. You fit click any product below to see details, or press microphone button and talk wetin you wan buy. For example, click Solar Bike or press mic and talk Solar Bike.",
    listening: "I dey listen now. Talk after beep.",
    heard: "You talk",
    productIntro: "You ask for {product}. {intro} Total price na {price} naira. I go scroll show you the picture. To open order page, press microphone button again and talk YES, or click the product.",
    confirmOpen: "I dey open order page for {product} now.",
    howToTitle: "HOW TO USE AM - Click or Talk:",
    how1: "1. CLICK any product picture below, OR press 🎤 and talk 'Solar bike' - I go scroll show you picture and talk wetin e fit do",
    how2: "2. Then press 🎤 again and talk 'YES' - or click Order button - to open order page",
    how3: "3. For order page, press 🎤 and talk 'YES' again, or tap green YES button - Order go enter with ID",
    howNote: "Must press mic before you talk. Welcome dey play once when page open.",
    badgeSayProduct: "TALK PRODUCT NAME OR CLICK ITEM",
    badgePressMic: "CLICK ITEM OR PRESS MIC + TALK PRODUCT NAME",
    badgeAwaitOpen: "PRESS MIC + TALK YES OR CLICK ITEM TO OPEN ORDER PAGE",
    badgeAwaitOrder: "PRESS MIC + TALK YES OR TAP YES BUTTON TO CONFIRM",
    tryAgain: "I no hear product name. You fit click any item below, or press mic and talk Solar Bike, Pump, etc.",
    needMic: "Abeg press microphone button before you talk. Or click product directly.",
    langCode: "en-NG",
    voiceActive: true,
    voiceLabel: "VOICE PCM - LISTING"
  },
  yo: {
    welcome: "Kaabo si Oja Solar Nicham. O le tẹ lori ọja eyikeyi ni isalẹ lati ri alaye, tabi tẹ bọtini maikirofooni ki o so ọja ti o fẹ. Fun apẹẹrẹ, tẹ Keke Solar tabi tẹ mic ki o so Keke Solar.",
    listening: "Mo n gbo nisinsinyi. Soro lẹhin beep.",
    heard: "O so pe",
    productIntro: "O beere fun {product}. {intro} Lapapo iye ni {price} naira. Emi yoo yi lọ lati fi aworan han ọ. Lati ṣi oju-iwe aṣẹ, tẹ bọtini maikirofooni lẹẹkansi ki o so BẸẸNI, tabi tẹ ọja naa.",
    confirmOpen: "Mo n ṣi oju-iwe aṣẹ fun {product} nisisiyi.",
    howToTitle: "BAWO LO ṢE LE LO - Tẹ tabi Sọrọ:",
    how1: "1. TẸ lori aworan ọja eyikeyi ni isalẹ, TABI tẹ 🎤 ki o so 'Keke solar' - Emi yoo yi lọ lati fi aworan han ọ ati sọ ohun ti o le ṣe",
    how2: "2. Lẹhinna tẹ 🎤 lẹẹkansi ki o so 'BẸẸNI' - tabi tẹ bọtini Paṣẹ - lati ṣi oju-iwe aṣẹ",
    how3: "3. Lori oju-iwe aṣẹ, tẹ 🎤 ki o so 'BẸẸNI' lẹẹkansi, tabi tẹ bọtini BẸẸNI alawọ ewe - Aṣẹ ti jẹrisi pẹlu ID",
    howNote: "O gbọdọ tẹ mic ṣaaju gbolohun ohun kọọkan. Ifiranṣẹ kaabo n dun lẹẹkan nigbati oju-iwe ba ṣii.",
    badgeSayProduct: "SO ORUKO OJA TABI TẸ OJA",
    badgePressMic: "TẸ OJA TABI TẸ MIC + SO ORUKO OJA",
    badgeAwaitOpen: "TẸ MIC + SO BẸẸNI TABI TẸ OJA LATI ṢI OJU-IWE AṢẸ",
    badgeAwaitOrder: "TẸ MIC + SO BẸẸNI TABI TẸ BỌTINI BẸẸNI LATI JẸRISI",
    tryAgain: "Emi ko gbo orukọ ọja. O le tẹ lori ohun kan ni isalẹ, tabi tẹ mic ki o so Keke Solar, ati bẹbẹ lọ.",
    needMic: "Jọwọ tẹ bọtini maikirofooni ṣaaju ki o to sọrọ. Tabi tẹ ọja naa taara.",
    langCode: "yo-NG",
    voiceActive: false,
    voiceLabel: "VOICE YO - LISTING (Text only)"
  },
  ha: {
    welcome: "Barka da zuwa Kasuwar Solar Nicham. Za ka iya danna kowane kaya a ƙasa don ganin bayani, ko danna maɓallin makirufo ka faɗi kayan da kake so. Misali, danna Keke Solar ko danna mic ka ce Keke Solar.",
    listening: "Ina sauraro yanzu. Yi magana bayan beep.",
    heard: "Ka ce",
    productIntro: "Ka nemi {product}. {intro} Jimillar farashi {price} naira ne. Zan gungura don nuna maka hoton. Don buɗe shafin oda, danna maɓallin makirufo kuma ka ce EH, ko danna kayan.",
    confirmOpen: "Ina buɗe shafin oda na {product} yanzu.",
    howToTitle: "YADDA AKE AMFANI - Danna ko Magana:",
    how1: "1. DANNA hoton kowane kaya a ƙasa, KO danna 🎤 ka ce 'Keke solar' - Zan gungura don nuna hoton da bayanin abin da zai iya yi",
    how2: "2. Sannan danna 🎤 kuma ka ce 'EH' - ko danna maɓallin Oda - don buɗe shafin oda",
    how3: "3. A shafin oda, danna 🎤 ka ce 'EH' kuma, ko danna koren maɓallin EH - An tabbatar da oda tare da ID",
    howNote: "Dole ka danna mic kafin kowace magana. Saƙon barka da zuwa yana kunna sau ɗaya lokacin da shafi ya buɗe.",
    badgeSayProduct: "FAƊI SUNAN KAYA KO DANNA KAYA",
    badgePressMic: "DANNA KAYA KO DANNA MIC + FAƊI SUNAN KAYA",
    badgeAwaitOpen: "DANNA MIC + CE EH KO DANNA KAYA DON BUƊE SHAFIN ODA",
    badgeAwaitOrder: "DANNA MIC + CE EH KO DANNA MAƁALLIN EH DON TABBATARWA",
    tryAgain: "Ban ji sunan kaya ba. Za ka iya danna wani abu a ƙasa, ko danna mic ka ce Keke Solar, da sauransu.",
    needMic: "Don Allah danna maɓallin makirufo kafin ka yi magana. Ko danna kayan kai tsaye.",
    langCode: "ha-NG",
    voiceActive: false,
    voiceLabel: "VOICE HA - LISTING (Rubutu kawai)"
  },
  ig: {
    welcome: "Nnọọ na Ahịa Solar Nicham. Ị nwere ike ịpị ngwaahịa ọ bụla dị n'okpuru ka ịhụ nkọwa, ma ọ bụ pịa bọtịnụ igwe okwu wee kwuo ngwaahịa ịchọrọ. Dịka ọmụmaatụ, pịa Keke Solar ma ọ bụ pịa mic kwuo Keke Solar.",
    listening: "Ana m ege ntị ugbu a. Kwuo okwu mgbe beep gasịrị.",
    heard: "I kwuru",
    productIntro: "Ị rịọrọ {product}. {intro} Ọnụ ahịa niile bụ {price} naira. M ga-atụgharị iji gosi gị foto. Iji mepee peeji iwu, pịa bọtịnụ igwe okwu ọzọ wee kwuo EE, ma ọ bụ pịa ngwaahịa ahụ.",
    confirmOpen: "Ana m emepe peeji iwu maka {product} ugbu a.",
    howToTitle: "OTU ESI EJI YA - Pịa ma ọ bụ Kwuo:",
    how1: "1. PỊA foto ngwaahịa ọ bụla n'okpuru, MA ọ bụ pịa 🎤 kwuo 'Keke solar' - M ga-atụgharị iji gosi foto na ihe ọ nwere ike ime",
    how2: "2. Mgbe ahụ pịa 🎤 ọzọ kwuo 'EE' - ma ọ bụ pịa bọtịnụ Iwu - iji mepee peeji iwu",
    how3: "3. Na peeji iwu, pịa 🎤 kwuo 'EE' ọzọ, ma ọ bụ pịa bọtịnụ akwụkwọ ndụ akwụkwọ ndụ EE - Ekwenyela iwu na ID",
    howNote: "Ga-pịa mic tupu ahịrịokwu olu ọ bụla. Ozi nnabata na-akpọ otu ugboro mgbe ibe mepere.",
    badgeSayProduct: "KWUO AHA NGWAAHỊA MA Ọ BỤ PỊA NGWAAHỊA",
    badgePressMic: "PỊA NGWAAHỊA MA Ọ BỤ PỊA MIC + KWUO AHA",
    badgeAwaitOpen: "PỊA MIC + KWUO EE MA Ọ BỤ PỊA NGWAAHỊA IJI MEPHE PEEJI IWU",
    badgeAwaitOrder: "PỊA MIC + KWUO EE MA Ọ BỤ PỊA BỌTỊNỤ EE IJI KWENYE",
    tryAgain: "Anụghị m aha ngwaahịa. Ị nwere ike ịpị ihe dị n'okpuru, ma ọ bụ pịa mic kwuo Keke Solar, wdg.",
    needMic: "Biko pịa bọtịnụ igwe okwu tupu ikwuo okwu. Ma ọ bụ pịa ngwaahịa ahụ ozugbo.",
    langCode: "ig-NG",
    voiceActive: false,
    voiceLabel: "VOICE IG - LISTING (Text only)"
  }
}

const productKeywords: any = {
  en: { bike: 1, cargo: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, plough: 5, plow: 5, dryer: 6, dry: 6, canoe: 7, kayak: 7, boat: 8, foldable: 9, collapsible: 9 },
  pcm: { bike: 1, cargo: 1, keke: 1, pump: 2, water: 2, freezer: 3, cold: 3, grid: 4, mini: 4, tractor: 5, dryer: 6, canoe: 7, boat: 8, foldable: 9 },
  yo: { keke: 1, bike: 1, fompu: 2, omi: 2, firisa: 3, grid: 4, tirakito: 5, gbigbe: 6, kika: 9 },
  ha: { keke: 1, kaya: 1, bike: 1, famfo: 2, ruwa: 2, firiza: 3, grid: 4, tarikta: 5, bushewa: 6, kwale: 7, jirgi: 8 },
  ig: { igwe: 1, bike: 1, mmiri: 2, friza: 3, grid: 4, trakto: 5, nkucha: 6, ugbo: 7, mpiachi: 9 }
}

function calcTotal(base: number) {
  const pf = Math.round(base * 0.10); const vat = Math.round(pf * 0.075); const esc = Math.round(base * 0.02); const gp = Math.round(base * 0.01)
  return base + pf + vat + esc + gp
}

function scrollToProduct(productId: number) {
  const element = document.getElementById(`product-${productId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element.classList.add('ring-4', 'ring-yellow-400', 'ring-offset-2')
    setTimeout(() => {
      element.classList.remove('ring-4', 'ring-yellow-400', 'ring-offset-2')
    }, 3000)
  }
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
    // Restore welcome message on listing page load - plays once
    if (currentMode === 'listing') {
      const welcome = prompts.welcome
      setResponse(welcome)
      if (prompts.voiceActive) {
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            const u = new SpeechSynthesisUtterance(welcome.replace(/Nicham/g, 'Nicham'))
            u.lang = prompts.langCode
            u.rate = 0.85
            window.speechSynthesis.speak(u)
          }
        }, 1000)
      }
    } else {
      const welcome = products[0] ? `${products[0].name}: ${products[0].intro} Total ${calcTotal(products[0].basePrice).toLocaleString()} naira. Press mic and say YES to confirm or tap YES button.` : prompts.welcome
      setResponse(welcome)
    }
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
    recognitionRef.current.lang = prompts.langCode
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
    const isYes = text.includes('yes') || text.includes('yeah') || text.includes('bẹẹni') || text.includes('eh') || text.includes('ee') || text.includes('beeni') || text.includes('ehen') || text.includes('confirm')
    const isNo = text.includes('no') || text.includes('back') || text.includes('bẹẹkọ') || text.includes("a'a") || text.includes('mba') || text.includes('cancel')

    // CRITICAL FIX: YES on listing page should ONLY open order page, NOT confirm order
    if (awaiting === 'open' && lastProduct) {
      if (isYes) {
        const msg = prompts.confirmOpen.replace('{product}', lastProduct.name)
        setResponse(msg + " Navigating to order page...")
        if (prompts.voiceActive) speak(msg)
        setAwaiting(null)
        setTimeout(() => router.push(`/product/${lastProduct.id}?lang=${lang}&voice=ready`), 2000)
        return
      }
      if (isNo) { setAwaiting(null); setLastProduct(null); setResponse(prompts.welcome); return }
    }

    // YES on order page confirms order - separate logic
    if (awaiting === 'order' || currentMode === 'order') {
      if (isYes) {
        if (currentMode === 'order') {
          window.dispatchEvent(new CustomEvent('voiceYesOrder'))
          setResponse("YES heard on order page! Confirming order with ID...")
        } else {
          // If on listing but awaiting order (should not happen) - treat as open
          const msg = prompts.confirmOpen.replace('{product}', lastProduct?.name || 'product')
          setResponse(msg)
          if (lastProduct) setTimeout(() => router.push(`/product/${lastProduct.id}?lang=${lang}&voice=ready`), 2000)
        }
        return
      }
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
        // Auto-scroll to product picture as requested
        scrollToProduct(productMeta.id)
        const msg = prompts.productIntro.replace('{product}', productMeta.name).replace('{intro}', productMeta.intro).replace('{price}', total.toLocaleString())
        setResponse(`${prompts.heard}: "${text}" → Found: ${productMeta.name}. Scrolling to show picture. ${msg}`)
        if (prompts.voiceActive) speak(msg)
        setAwaiting('open')
        return
      }
    }

    if (isYes && !lastProduct && currentMode === 'listing') {
      setResponse(`You said YES but no product yet. ${prompts.needMic} First say product name like Solar Bike, or click item below.`)
      return
    }

    if (isYes && currentMode === 'order') {
      window.dispatchEvent(new CustomEvent('voiceYesOrder'))
      setResponse("YES heard on order page! Confirming order...")
      return
    }

    setResponse(`${prompts.heard}: "${text}". ${prompts.tryAgain}`)
    if (prompts.voiceActive) speak(prompts.tryAgain)
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 max-w-[92vw]">
      {(transcript || response) && (
        <div className="bg-black text-white rounded-2xl p-4 max-w-[400px] text-xs shadow-2xl border-2 border-yellow-400">
          <div className="text-yellow-300 font-black mb-2 flex justify-between items-center gap-2">
            <span className="text-[11px]">🎤 {prompts.voiceLabel}</span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[8px]">{awaiting ? (awaiting === 'open' ? prompts.badgeAwaitOpen : prompts.badgeAwaitOrder) : prompts.badgeSayProduct}</span>
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
      <div className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-bold text-center max-w-[260px] leading-tight">
        {isListening ? '🔴 LISTENING' : awaiting === 'open' ? prompts.badgeAwaitOpen : awaiting === 'order' ? prompts.badgeAwaitOrder : prompts.badgePressMic}
      </div>
    </div>
  )
}
