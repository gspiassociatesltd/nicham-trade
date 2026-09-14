'use client'
import { useState, useEffect } from 'react'
import { translations, productTranslations } from '../lib/i18n'
import LangToggle from '../components/LangToggle'
import SearchMic from '../components/SearchMic'

const productsMeta = [
  { id: 1, basePrice: 400000, img: "🚲", keywords: "cargo bike solar 500w" },
  { id: 2, basePrice: 280000, img: "💧", keywords: "water pump solar irrigation" },
  { id: 3, basePrice: 240000, img: "❄️", keywords: "freezer cold fish" },
  { id: 4, basePrice: 2200000, img: "⚡", keywords: "home system mini grid" },
  { id: 5, basePrice: 3400000, img: "🚜", keywords: "tractor solar farm" },
  { id: 6, basePrice: 130000, img: "☀️", keywords: "dryer tomatoes pepper" },
  { id: 7, basePrice: 160000, img: "🛶", keywords: "boat engine solar" },
  { id: 8, basePrice: 1050000, img: "🚤", keywords: "ferry 12 seater" },
  { id: 9, basePrice: 250000, img: "🚲‍♂️", keywords: "e-bike collapsible" },
]

function calcTotal(base: number) {
  const competitivePrice = base * 0.98
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrow)
}

const uiText: any = {
  en: { 
    greenBar: "Green Points on Solar Purchases | Platform: GSPI/NiChAm | Delivers Nationwide",
    everything: "Everything Solar - Solar Cargo Bikes, Pumps, Freezers, Mini-Grids, Tractors e.t.c. - Delivery Nationwide",
    marketplace: "Marketplace Model: GSPI/NiChAm Platform | Escrow with MTN MoMo | AfricanIES Nationwide Delivery",
    escrowFlow: "Buyer orders on platform → Escrow with MTN's momo → AfricanIES collects from manufacturers & delivers → Buyer confirms → MTN's momo pays",
    welcomeBox: "Welcome to Nicham Solar Market. Type product name in search box then click Search.",
    welcomeSpeech: "Welcome to Nicham solar market, type the product you want in the search column then click search or click the microphone and say the name of the product you want.",
    searchPlaceholder: "Type product name e.g. Solar Bike, Pump, Freezer...",
    searchBtn: "Search",
    hearWelcome: "Hear Welcome",
    voiceComingSoon: "Voice coming soon"
  },
  pidgin: { 
    greenBar: "Green Points for Solar Buy | Platform: GSPI/NiChAm | We Dey Deliver Everywhere",
    everything: "Everything Solar - Solar Cargo Bike, Pump, Freezer, Mini-Grid, Tractor etc - We Dey Deliver Everywhere",
    marketplace: "Marketplace Model: GSPI/NiChAm Platform | Escrow with MTN MoMo | AfricanIES Deliver Everywhere",
    escrowFlow: "Buyer order for platform → Escrow with MTN MoMo → AfricanIES collect from manufacturer & deliver → Buyer confirm → MTN MoMo pay",
    welcomeBox: "Welcome to Nicham Solar Market. Type product wey you want for search box then press Find Am.",
    welcomeSpeech: "Welcome to Nicham Solar Market. Type product wey you want for search box, then press Search or press microphone talk the product name.",
    searchPlaceholder: "Type product name e.g. Solar Bike, Pump, Freezer...",
    searchBtn: "Find Am",
    hearWelcome: "Hear Welcome",
    voiceComingSoon: "Voice coming soon"
  },
  ha: { 
    greenBar: "Mak points kore akan Sayayyan Solar | Platform: GSPI/NiChAm | Isarwa a Fadin Kasa",
    everything: "Komai na Solar - Kekunan Kaya na Solar, Famfo, Firiza, Mini-Grids, Tractors da sauransu - Isarwa a Fadin Kasa",
    marketplace: "Tsarin Kasuwa: Dandalin GSPI/NiChAm | Escrow da MTN MoMo | AfricanIES Isarwa a Fadin Kasa",
    escrowFlow: "Mai saye yayi oda a dandali → Escrow da MTN MoMo → AfricanIES tattara daga masana'anta & isarwa → Mai saye tabbatar → MTN MoMo biya",
    welcomeBox: "Barka da zuwa Kasuwar Solar ta Nicham. Rubuta sunan kaya a akwatin bincike sannan danna Nema.",
    welcomeSpeech: "Barka da zuwa Kasuwar Solar ta Nicham.",
    searchPlaceholder: "Rubuta sunan kaya e.g. Keke Solar, Famfo, Firiza...",
    searchBtn: "Nema",
    hearWelcome: "Ji Maraba",
    voiceComingSoon: "Murya na zuwa anjima"
  },
  yo: { 
    greenBar: "Gba Green Points lori Rira Solar | Platform: GSPI/NiChAm | Ifijiṣẹ Kaakiri",
    everything: "Gbogbo Nnkan Solar - Keke Eru Solar, Fompu, Firisa, Mini-Grids, Tractors ati bẹẹ lọ - Ifijiṣẹ Kaakiri Orilẹ-ede",
    marketplace: "Awoṣe Ọja: Platform GSPI/NiChAm | Escrow pẹlu MTN MoMo | Ifijiṣẹ AfricanIES Kaakiri",
    escrowFlow: "Olura paṣẹ lori platform → Escrow pẹlu MTN MoMo → AfricanIES gba lati ọdọ awọn olupese & fi jiṣẹ → Olura jẹrisi → MTN MoMo sanwo",
    welcomeBox: "Kaabo si oja Nicham Solar. Tẹ orukọ ọja ti o fẹ sinu apoti iwadi lẹhinna tẹ Wa.",
    welcomeSpeech: "Kaabo si oja Nicham Solar.",
    searchPlaceholder: "Tẹ orukọ ọja e.g. Keke Solar, Fompu, Firisa...",
    searchBtn: "Wa",
    hearWelcome: "Gbọ Kaabo",
    voiceComingSoon: "Ohun n bọ laipẹ"
  },
  ig: { 
    greenBar: "Nweta Green Points na Ịzụta Solar | Platform: GSPI/NiChAm | Na-ebuga Mba Nile",
    everything: "Ihe Nile Solar - Igwe Ịnya Solar, Pumps, Freezers, Mini-Grids, Tractors wdg - Mbuga Mba Nile",
    marketplace: "Ụdị Ahịa: Platform GSPI/NiChAm | Escrow na MTN MoMo | Mbuga AfricanIES Mba Nile",
    escrowFlow: "Onye zụrụ ahịa na-enye iwu n'elu ikpo okwu → Escrow na MTN MoMo → AfricanIES na-anakọta n'aka ndị nrụpụta & na-ebuga → Onye zụrụ ahịa kwadoro → MTN MoMo na-akwụ ụgwọ",
    welcomeBox: "Nnọọ na Ahịa Solar Nicham. Pịnye aha ngwaahịa n'igbe nchọta wee pịa Chọọ.",
    welcomeSpeech: "Nnọọ na Ahịa Solar Nicham.",
    searchPlaceholder: "Pịnye aha ngwaahịa e.g. Bike Solar, Pump, Freezer...",
    searchBtn: "Chọọ",
    hearWelcome: "Nụrụ Nnọọ",
    voiceComingSoon: "Olu na-abịa n'oge adịghị anya"
  }
}

export default function Home() {
  const [lang, setLang] = useState('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState(productsMeta)

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const urlLang = sp.get('lang')
    if (urlLang) {
      setLang(urlLang)
      localStorage.setItem('nicham_lang', urlLang)
    } else {
      const saved = localStorage.getItem('nicham_lang') || 'en'
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    if (!searchTerm) { setFiltered(productsMeta); return }
    const low = searchTerm.toLowerCase()
    setFiltered(productsMeta.filter(p=>p.keywords.includes(low)))
  }, [searchTerm])

  const speakWelcome = () => {
    // MVP: Only EN and PIDGIN have voice, HA/YO/IG muted with Voice coming soon
    if (lang === 'ha' || lang === 'yo' || lang === 'ig') {
      return // button will show Voice coming soon, no action
    }
    try {
      window.speechSynthesis.cancel()
      const text = uiText[lang]?.welcomeSpeech || uiText.en.welcomeSpeech
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-NG'
      // Pidgin slower as requested
      u.rate = lang === 'pidgin' ? 0.7 : 0.85
      window.speechSynthesis.speak(u)
    } catch {}
  }

  const t = uiText[lang] || uiText.en
  const tr = translations[lang] || translations.en
  const pTr = productTranslations[lang] || productTranslations.en
  const isMuted = lang === 'ha' || lang === 'yo' || lang === 'ig'

  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-black text-white p-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-wide">☀ NiChAm Solar Market</h1>
          <div className="text-yellow-300 text-xs mt-1">GSPI/NiChAm: Platform owner only | AfricanIES: Delivers Nationwide</div>
        </div>
        <div className="flex justify-end mt-2">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      <div className="bg-green-700 text-white text-center py-2 text-xs font-bold">
        🌱 {t.greenBar}
      </div>

      <div className="max-w-5xl mx-auto p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 mt-4">{t.everything}</h2>
        <div className="text-sm text-gray-600 mt-1">{t.marketplace}</div>
        <div className="text-[11px] text-gray-500 mt-1">{t.escrowFlow}</div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 max-w-2xl mx-auto">
          <div className="font-bold text-sm">{t.welcomeBox}</div>
          <button onClick={speakWelcome} disabled={isMuted} className={`mt-2 px-4 py-1.5 rounded-full text-xs font-bold ${isMuted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white'}`}>
            {isMuted ? `🔇 ${t.voiceComingSoon}` : `🔊 ${t.hearWelcome}`}
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2 max-w-xl mx-auto">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder={t.searchPlaceholder} className="flex-1 px-4 py-2.5 rounded-full border-2 border-black text-sm" />
          <button className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold">🔍 {t.searchBtn}</button>
          <SearchMic lang={lang} onResult={(txt:string)=>setSearchTerm(txt)} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">
          {filtered.map(p=>{
            const meta = pTr[p.id] || { name: "Solar Product", desc: "" }
            const total = calcTotal(p.basePrice)
            return (
              <a key={p.id} href={`/product/${p.id}?lang=${lang}`} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                <div className="text-3xl">{p.img}</div>
                <div className="font-black mt-2 text-sm">{meta.name}</div>
                <div className="text-[11px] text-gray-600 mt-1 line-clamp-3">{meta.desc}</div>
                <div className="text-green-700 font-black mt-2 text-sm">₦{total.toLocaleString()}</div>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}
