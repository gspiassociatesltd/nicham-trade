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

export default function Home() {
  const [lang, setLang] = useState('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState(productsMeta)

  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (saved) setLang(saved)
    // Voice welcome message plays automatically on arriving at listing page - as requested
    setTimeout(() => {
      try {
        const currentLang = saved || 'en'
        if (currentLang === 'en' || currentLang === 'pidgin') {
          const msg = "Welcome to Nicham solar market, type the product you want in the search column then click search or click the microphone and say the name of the product you want."
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel()
            const u = new SpeechSynthesisUtterance(msg)
            u.lang = "en-NG"
            u.rate = 0.85
            window.speechSynthesis.speak(u)
          }
        }
      } catch {}
    }, 1200)
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(productsMeta)
    } else {
      const term = searchTerm.toLowerCase()
      const res = productsMeta.filter(p => {
        const prodTrans = (productTranslations[lang] || productTranslations.en)[p.id]
        const name = prodTrans.name.toLowerCase()
        const intro = prodTrans.intro.toLowerCase()
        return name.includes(term) || intro.includes(term) || p.keywords.includes(term)
      })
      setFiltered(res)
    }
  }, [searchTerm, lang])

  const handleLang = (l: string) => {
    setLang(l)
    localStorage.setItem('nicham_lang', l)
  }

  const handleSearch = () => {
    const el = document.getElementById('products-grid')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const t = translations[lang] || translations.en

  const welcomeText: any = {
    en: "Welcome to Nicham solar market, type the product you want in the search column then click search or click the microphone and say the name of the product you want.",
    pidgin: "Welcome to Nicham solar market, type product wey you want for search column then click search or click microphone and talk the product name.",
    ha: "Barka da zuwa kasuwar Nicham Solar. Rubuta sunan kayan da kake so a wurin bincike sannan danna search.",
    ig: "Nnoo na ahia Nicham Solar. Pịnye aha ngwaahịa ịchọrọ na kọlụm ọchụchọ wee pịa search.",
    yo: "Kaabo si oja Nicham Solar. Tẹ orukọ ọja ti o fẹ sinu apoti iwadi lẹhinna tẹ search."
  }

  return (
    <main className="min-h-screen">
      <header className="bg-black text-white p-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-wide">☀️ NiChAm Solar Market</h1>
          <p className="text-xs text-yellow-300 mt-1">GSPI/NiChAm: Platform owner only | AfricanIES: Delivers Nationwide</p>
        </div>
        <div className="flex justify-end mt-2">
          <LangToggle lang={lang} setLang={handleLang} />
        </div>
      </header>

      <div className="bg-green-700 text-white text-center p-2 text-sm font-bold">
        🌱 {lang==='ha' ? 'Mak points kore akan Sayayyan Solar | Platform: GSPI/NiChAm | Isarwa a Fadin Kasa' : lang==='yo' ? 'Gba Green Points lori Rira Solar | Platform: GSPI/NiChAm | Ifijiṣẹ Kaakiri' : lang==='pidgin' ? 'Get Green Points for Solar Buy | Platform: GSPI/NiChAm | We Dey Deliver Everywhere' : 'Green Points on Solar Purchases | Platform: GSPI/NiChAm | Delivers Nationwide'}
      </div>

      <section className="p-6 text-center bg-gradient-to-br from-yellow-50 to-green-50">
        <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-700">{lang==='ha' ? 'Komai na Solar - Kekunan Kaya na Solar, Famfo, Firiza, Mini-Grids, Tractors da sauransu - Isarwa a Fadin Kasa' : lang==='yo' ? 'Gbogbo Nnkan Solar - Keke Eru Solar, Fompu, Firisa, Mini-Grids, Tractors ati bẹẹ lọ - Ifijiṣẹ Kaakiri Orilẹ-ede' : lang==='pidgin' ? 'Everything Solar - Solar Cargo Bike, Pump, Freezer, Mini-Grid, Tractor etc - We Dey Deliver Everywhere' : 'Everything Solar - Solar Cargo Bikes, Pumps, Freezers, Mini-Grids, Tractors e.t.c. - Delivery Nationwide'}</h2>
        <p className="text-gray-600 mb-2">{lang==='ha' ? 'Tsarin Kasuwa: Dandalin GSPI/NiChAm | Escrow da MTN MoMo | AfricanIES Isarwa a Fadin Kasa' : lang==='yo' ? 'Awoṣe Ọja: Platform GSPI/NiChAm | Escrow pẹlu MTN MoMo | Ifijiṣẹ AfricanIES Kaakiri' : lang==='pidgin' ? 'Marketplace Model: GSPI/NiChAm Platform | Escrow with MTN MoMo | AfricanIES Deliver Everywhere' : 'Marketplace Model: GSPI/NiChAm Platform | Escrow with MTN MoMo | AfricanIES Nationwide Delivery'}</p>
        <p className="text-xs text-gray-500 max-w-3xl mx-auto">Buyer orders on platform → Escrow with MTN&apos;s momo → AfricanIES collects from manufacturers & delivers → Buyer confirms - MTN&apos;s momo pays</p>
        
        <div className="max-w-3xl mx-auto mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 text-sm text-center">
          <b>{welcomeText[lang] || welcomeText.en}</b>
          <div className="mt-2">
            <button onClick={() => {
              try {
                const msg = welcomeText[lang] || welcomeText.en
                const u = new SpeechSynthesisUtterance(msg)
                u.lang = lang === 'en' || lang === 'pidgin' ? 'en-NG' : 'en-NG'
                u.rate = 0.85
                window.speechSynthesis.cancel()
                window.speechSynthesis.speak(u)
              } catch {}
            }} className="text-xs px-3 py-1 bg-black text-white rounded-full">🔊 Hear Welcome</button>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-4 flex gap-2 items-center">
          <SearchMic lang={lang} onResult={(txt) => setSearchTerm(txt)} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Type product name e.g. Solar Bike, Pump, Freezer..."
            className="flex-1 px-4 py-3 rounded-full border-2 border-black text-sm focus:outline-none focus:border-green-600"
            id="searchInput"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-black text-white rounded-full text-sm font-black hover:bg-gray-800"
          >
            🔍 Search
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 hidden"></div>
      </section>

      <section id="products-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
        {filtered.map((m) => {
          const pt = (productTranslations[lang] || productTranslations.en)[m.id]
          const total = calcTotal(m.basePrice)
          return (
            <a key={m.id} href={`/product/${m.id}?lang=${lang}`} className="bg-white rounded-2xl shadow border p-4 hover:shadow-lg transition">
              <div className="text-3xl">{m.img}</div>
              <h3 className="font-black mt-2">{pt.name}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{pt.intro}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">Total</span>
                <span className="font-black text-green-700">₦{total.toLocaleString()}</span>
              </div>
            </a>
          )
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-10">
            <div className="text-4xl mb-2">🔍</div>
            <div className="font-bold">No product found for &quot;{searchTerm}&quot;</div>
            <div className="text-sm text-gray-600 mt-1">Try Solar Bike, Pump, Freezer, Dryer, Tractor</div>
            <button onClick={() => setSearchTerm('')} className="mt-3 px-4 py-2 bg-black text-white rounded-full text-sm">Show All Products</button>
          </div>
        )}
      </section>

      <footer className="bg-black text-white p-6 text-xs mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-bold mb-2">Marketplace Model</div>
            <div>GSPI/NiChAm: Platform owner only</div>
            <div>AfricanIES: Delivers Nationwide</div>
          </div>
          <div>
            <div className="font-bold mb-2">How It Works</div>
            <div>Buyer orders → Escrow with MTN MoMo → Collection & Delivery → Buyer confirms - MoMo pays</div>
          </div>
          <div>
            <div className="font-bold mb-2">Carbon Mission</div>
            <div>Mission: Reduce Nigerians using fossil fuel</div>
          </div>
          <div>
            <div className="font-bold mb-2">Follow Us</div>
            <div>© GSPI Associates Ltd • Platform Owner Only | Delivers Nationwide</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
