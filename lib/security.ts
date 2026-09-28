// High + Low level security - perpetual self improvement
import crypto from 'crypto'

// Sanitize inputs to prevent XSS/SQLi
export function sanitizeInput(input: string): string {
  if(!input) return ''
  return input.replace(/[<>'"`]/g, '').trim().slice(0, 500)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 254
}

export function isValidNigerianPhone(phone: string): boolean {
  return /^0[789][01]\d{8}$/.test(phone.replace(/\s/g,''))
}

// Generate secure delivery identifier (QR code content)
export function generateSecureDeliveryId(orderId: string): string {
  const secret = process.env.DELIVERY_SECRET || 'nicham-trade-secure-2026'
  const hash = crypto.createHmac('sha256', secret).update(orderId + Date.now()).digest('hex').slice(0, 12).toUpperCase()
  return `${orderId.slice(0,6).toUpperCase()}-${hash}`
}

// Verify Paystack webhook signature (already in paystack.ts but hardened)
export function verifyPaystackSignatureHardened(payload: string, signature: string, secret: string): boolean {
  try {
    const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))
  } catch { return false }
}
