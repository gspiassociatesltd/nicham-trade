'use client'
import { langs, langLabels, translations } from '@/lib/i18n'

export default function LangToggle({ lang, setLang }: any) {
  const speak = (text: string, langCode: string) => {
    if (!translations[langCode]?.voice) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = langCode === 'pcm' ? 'en-NG' : 'en-US'
      utter.rate = 0.9
      window.speechSynthesis.speak(utter)
    }
  }

  return (
    <div className="flex gap-1 p-1 bg-yellow-400 rounded-full">
      {langs.map((l: string) => {
        const hasVoice = translations[l]?.voice
        return (
          <button 
            key={l} 
            onClick={()=>{
              setLang(l)
              if(hasVoice) speak(translations[l].subtitle, l)
            }} 
            className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${lang===l?'bg-black text-white':'bg-white text-black'}`}
            title={hasVoice ? 'Voice enabled' : 'Text only - voice coming with funding'}
          >
            {langLabels[l]}
            {hasVoice ? ' 🔊' : ' 🔇'}
          </button>
        )
      })}
    </div>
  )
}
