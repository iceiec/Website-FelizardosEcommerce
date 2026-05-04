import { NextRequest, NextResponse } from 'next/server'
import { getEvents, createEvent } from '@/lib/database'

/**
 * GET /api/events
 * Fetch all events
 */
export async function GET() {
  try {
    const result = await getEvents()

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data: result.data, message: result.message },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/events
 * Create a new event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, date, location } = body

    // Validate input
    if (!name || !date) {
      return NextResponse.json(
        { success: false, error: 'Name and date are required' },
        { status: 400 }
      )
    }

    const result = await createEvent({
      name,
      description,
      date,
      location,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data: result.data, message: result.message },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
