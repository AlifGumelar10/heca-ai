import { NextResponse } from 'next/server'

const ML_URL = process.env.ML_SERVICE_URL ?? 'https://testingforalyst-heca-ai-ml.hf.space'

export async function GET() {
  try {
    const res = await fetch(`${ML_URL}/health`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json({ backend: 'ok', ml_service: data })
  } catch {
    return NextResponse.json({ backend: 'ok', ml_service: { status: 'unreachable' } })
  }
}
