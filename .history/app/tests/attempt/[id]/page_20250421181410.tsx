// File: app/api/test-result/[id]/route.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth' // your auth util
import { getTestResultById } from '@/lib/db'    // your DB util

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Authenticate user
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = await verifyToken(token)
    if (!decoded?.userId) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
    }

    const userId = decoded.userId
    const testId = parseInt(params.id, 10)
    if (isNaN(testId)) {
      return NextResponse.json({ success: false, error: 'Invalid test ID' }, { status: 400 })
    }

    // 2. Fetch result from database
    const result = await getTestResultById(userId, testId)
    if (!result) {
      return NextResponse.json({ success: false, message: 'Result not found' }, { status: 404 })
    }

    // 3. Return the result
    return NextResponse.json({ success: true, result })
  } catch (err: any) {
    console.error('Error in /api/test-result/[id]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}