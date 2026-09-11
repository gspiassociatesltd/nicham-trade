
'use client'
import { langs } from '@/lib/i18n'
export default function LangToggle({ lang, setLang }: any) {
  return (
    <div className="flex gap-2 p-2 bg-yellow-400 rounded-full">
      {langs.map((l: string) => (
        <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded-full text-xs font-bold ${lang===l?'bg-black text-white':'bg-white'}`}>{l.toUpperCase()}</button>
      ))}
    </div>
  )
}
