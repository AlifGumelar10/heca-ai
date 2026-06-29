import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ML_URL = process.env.ML_SERVICE_URL ?? 'https://testingforalyst-heca-ai-ml.hf.space'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, epsilon = 0.10, session_id } = body

    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      return NextResponse.json(
        { message: 'Teks terlalu pendek, minimal 3 karakter.' },
        { status: 422 }
      )
    }

    // Panggil ML Service (HuggingFace Space)
    const mlRes = await fetch(`${ML_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ text: text.trim(), epsilon }),
    })

    if (!mlRes.ok) {
      const err = await mlRes.json().catch(() => ({}))
      return NextResponse.json(
        { message: (err as any).detail ?? 'Layanan model sedang tidak tersedia.' },
        { status: 503 }
      )
    }

    const result = await mlRes.json()

    // Simpan ke Supabase
    const { data: saved, error } = await supabase
      .from('consultations')
      .insert({
        session_id: session_id ?? null,
        input_text: result.input_text ?? text.trim(),
        clean_text: result.clean_text ?? null,
        prediction: result.prediction ?? null,
        credibility: result.credibility ?? null,
        confidence: result.confidence ?? null,
        credibility_level: result.credibility_level ?? null,
        credibility_color: result.credibility_color ?? null,
        prediction_set: result.prediction_set ?? [],
        prediction_set_size: result.prediction_set_size ?? (result.prediction_set?.length ?? 0),
        epsilon: result.epsilon ?? epsilon,
        top_classes: result.top_classes ?? [],
        top_pvalues: result.top_pvalues ?? [],
        top_similarity: result.top_similarity ?? [],
        top_distance: result.top_distance ?? [],
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      // Tetap kembalikan hasil ML meski gagal simpan
      return NextResponse.json({ data: result, id: null, created_at: null }, { status: 201 })
    }

    return NextResponse.json(
      { data: result, id: saved.id, created_at: saved.created_at },
      { status: 201 }
    )
  } catch (err) {
    console.error('consultations POST error:', err)
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const session_id = searchParams.get('session_id')
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '30'), 100)

    let query = supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (session_id) {
      query = query.eq('session_id', session_id)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ data: data ?? [] })
  } catch (err) {
    console.error('consultations GET error:', err)
    return NextResponse.json({ data: [] })
  }
}
