"use client"
import { langs, Lang } from '@/lib/i18n'
export default function LangToggle({lang, setLang}:{lang:Lang, setLang:(l:Lang)=>void}){
  return <div className="flex gap-1 bg-black text-white rounded-full p-1">
    {langs.map(l=> <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded-full text-xs font-bold ${lang===l?'bg-white text-black':''}`}>{l.toUpperCase()}</button>)}
  </div>
}
