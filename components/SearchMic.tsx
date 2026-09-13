'use client'
import { useState } from 'react'
import { listenFor } from '../lib/VoiceEngine'

export default function SearchMic({ lang, onResult }: { lang: string, onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false)

  // Language Committee: Only show mic for English in V50 to avoid English-on-Yoruba bug
  const showMic = lang === 'en' || lang === 'pidgin' // pidgin uses en-NG voice safely
  if (!showMic) return null

  const handleMic = () => {
    listenFor((txt) => {
      onResult(txt)
    }, () => setListening(true), () => setListening(false), "en-NG")
  }

  return (
    <button
      onClick={handleMic}
      type="button"
      className={`px-3 py-3 rounded-full border-2 text-sm font-bold ${listening ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-white border-black'}`}
      title="Click and say product name"
    >
      {listening ? '🎙️...' : '🎤'}
    </button>
  )
}
