import { NextResponse } from 'next/server'

const ML_URL = process.env.ML_SERVICE_URL ?? 'https://testingforalyst-heca-ai-ml.hf.space'

export async function GET() {
  try {
    const res = await fetch(`${ML_URL}/classes`, { next: { revalidate: 3600 } })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ classes: [], total: 0 })
  }
}
