import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/payload.server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: request.headers })
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
