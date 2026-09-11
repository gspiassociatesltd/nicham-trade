export const langs = ['en','ha','yo','ig','pcm'] as const
export type Lang = typeof langs[number]
export const t:any = {
  en: { hero: "Farm machines for every Nigerian farmer.", sub: "Cargo bikes, pumps, freezers, tractors - pay with MTN MoMo. Earn airtime sharing.", listen: "🎤 Listen in English", share: "Share on WhatsApp/Ayoba +10", shareAyoba: "Share on Ayoba", airtime: "Green Points → MTN Airtime", agent: "I am Agent", orderFor: "Order for Farmer", sea: "Sea Freight (Cheap 30d)", air: "Air Freight (Fast 7d)", allNaija: "All Nigeria • 36 States" },
  ha: { hero: "Injinan gona ga kowane manomin Najeriya.", sub: "Kekuna, famfuna, firiza, tiraktoci - biya da MoMo. Sami airtime.", listen: "🎤 Ji Muryar Hausa", share: "Raba a WhatsApp/Ayoba +10", shareAyoba: "Raba a Ayoba", airtime: "Green Points → Airtime MTN", agent: "Ni Wakilin Gona ne", orderFor: "Yi oda ga manomi", sea: "Jirgin Ruwa (Arha kwana 30)", air: "Jirgin Sama (Gaggawa kwana 7)", allNaija: "Duk Najeriya • Jihohi 36" },
  yo: { hero: "Ẹrọ oko fun gbogbo agbẹ Naijiria.", sub: "Kẹkẹ, fifa omi, firisa, tirakito - sanwo pẹlu MoMo. Jo'wọ airtime.", listen: "🎤 Gbọ ni Yoruba", share: "Pin lori WhatsApp/Ayoba +10", shareAyoba: "Pin lori Ayoba", airtime: "Green Points → Airtime MTN", agent: "Mo jẹ Aṣoju", orderFor: "Bere fun Agbẹ", sea: "Ọkọ Omi (Olowo poku 30j)", air: "Ọkọ Ofurufu (Yara 7j)", allNaija: "Gbogbo Naijiria • Ipinle 36" },
  ig: { hero: "Igwe ọrụ ugbo maka onye ọrụ ugbo Naijiria ọ bụla.", sub: "Ịnya igwe, mgbapụta, friza, traktọ - kwụọ na MoMo. Nweta airtime.", listen: "🎤 Gee na Igbo", share: "Kekọrịta na WhatsApp/Ayoba +10", shareAyoba: "Kekọrịta na Ayoba", airtime: "Green Points → Airtime MTN", agent: "Abụ m Agent", orderFor: "Nye onye ọrụ ugbo iwu", sea: "Ụgbọ Mmiri (Dị ọnụ ala 30d)", air: "Ụgbọ Elu (Ngwa ngwa 7d)", allNaija: "Naijiria niile • Steeti 36" },
  pcm: { hero: "Farm machine for every Naija farmer.", sub: "Cargo bike, pump, freezer, tractor - pay with MoMo. Earn airtime as you share.", listen: "🎤 Listen for Pidgin", share: "Share for WhatsApp/Ayoba +10", shareAyoba: "Share for Ayoba", airtime: "Green Points → MTN Airtime", agent: "I be Agent", orderFor: "Order for Farmer", sea: "Sea Ship (Cheap 30 days)", air: "Air Ship (Fast 7 days)", allNaija: "All Naija • 36 States" },
}
export function speak(text:string, lang:Lang){
  if(typeof window==='undefined') return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang==='ha'?'ha-NG': lang==='yo'?'yo-NG': lang==='ig'?'ig-NG': 'en-NG'
  u.rate = 0.9
  speechSynthesis.speak(u)
}
