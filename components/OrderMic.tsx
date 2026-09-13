'use client'
import { useState } from 'react'
import { listenFor, speakEnglish } from '../lib/VoiceEngine'

export default function OrderMic({ onYES }: { onYES: () => void }) {
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState("")

  const handleListen = () => {
    listenFor((txt) => {
      setHeard(txt)
      const low = txt.toLowerCase()
      if (low.includes("yes") || low.includes("confirm")) {
        onYES()
      }
    }, () => setListening(true), () => setListening(false), "en-NG")
  }

  const handleHear = () => {
    speakEnglish("You are on order page. Total price shown. Click YES - Confirm button below, or click mic and say YES. No typing needed.")
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex gap-2">
        <button onClick={onYES} className="flex-1 py-3 bg-green-600 text-white rounded-full font-black text-sm hover:bg-green-700">
          YES - Confirm
        </button>
        <button onClick={handleHear} className="flex-1 py-3 bg-black text-white rounded-full font-bold text-sm">
          Hear Instruction
        </button>
      </div>
      <button onClick={handleListen} className={`w-full py-2 rounded-full text-xs font-bold border-2 ${listening ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-white border-black'}`}>
        {listening ? '🎙️ Listening... Say YES' : '🎤 Mic - Say YES'}
      </button>
      {heard && <div className="text-[10px] text-gray-600 text-center">Heard: "{heard}"</div>}
    </div>
  )
}
