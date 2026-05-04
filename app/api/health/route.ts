import { NextResponse } from 'next/server'

/**
 * GET /api/health
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
    { status: 200 }
  )
}
