import crypto from 'crypto'
export function sanitizeInput(input: string): string {
  if(!input) return ''
  return input.replace(/[<>'"`]/g, '').trim().slice(0, 500)
}
export function generateSecureDeliveryId(orderId: string): string {
  const secret = process.env.DELIVERY_SECRET || 'nicham-trade-secure-2026'
  const hash = crypto.createHmac('sha256', secret).update(orderId + Date.now().toString()).digest('hex').slice(0, 12).toUpperCase()
  return `${orderId.slice(0,6).toUpperCase()}-${hash}`
}
