
export function speakEnglish(text: string) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = "en-NG"
    u.rate = 0.85
    window.speechSynthesis.speak(u)
  } catch {}
}

export function listenFor(callback: (transcript: string) => void, onStart: () => void, onEnd: () => void, langCode: string = "en-NG") {
  try {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) {
      alert("Voice not supported on this browser - please type")
      return
    }
    const rec = new SR()
    rec.lang = langCode
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onstart = () => { try{ onStart() } catch{} }
    rec.onend = () => { try{ onEnd() } catch{} }
    rec.onresult = (e: any) => {
      try {
        const txt = e.results[0][0].transcript
        callback(txt)
      } catch {}
    }
    rec.start()
  } catch {
    try{ onEnd() } catch{}
  }
}
