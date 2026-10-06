import { NextResponse } from 'next/server'
import { DEFAULT_BUTTONS } from '@/app/lib/productButtons'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'productButtons.json')

function loadButtons() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch {}
  return DEFAULT_BUTTONS
}

export async function GET() {
  const buttons = loadButtons()
  return NextResponse.json({ buttons })
}

export async function POST(req: Request) {
  try {
    const { buttons } = await req.json()
    // Save to data folder
    try {
      const dir = path.dirname(DATA_FILE)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(DATA_FILE, JSON.stringify(buttons, null, 2))
    } catch {}
    return NextResponse.json({ success: true, buttons })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
