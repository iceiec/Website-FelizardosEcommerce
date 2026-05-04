import { supabaseAdmin } from './supabase'

export type Event = {
  id: string
  name: string
  description?: string
  date: string
  location?: string
  created_at: string
  updated_at: string
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message: string
}

/**
 * Fetch all events from the database
 */
export async function getEvents(): Promise<ApiResponse<Event[]>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      return {
        success: false,
        message: 'Failed to fetch events',
        error: error.message,
      }
    }

    return {
      success: true,
      data: data || [],
      message: 'Events fetched successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching events',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Fetch a single event by ID
 */
export async function getEventById(id: string): Promise<ApiResponse<Event>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return {
        success: false,
        message: 'Event not found',
        error: error.message,
      }
    }

    return {
      success: true,
      data,
      message: 'Event fetched successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching event',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Create a new event
 */
export async function createEvent(
  event: Omit<Event, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<Event>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert([event])
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: 'Failed to create event',
        error: error.message,
      }
    }

    return {
      success: true,
      data,
      message: 'Event created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error creating event',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Update an existing event
 */
export async function updateEvent(
  id: string,
  updates: Partial<Event>
): Promise<ApiResponse<Event>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: 'Failed to update event',
        error: error.message,
      }
    }

    return {
      success: true,
      data,
      message: 'Event updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error updating event',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Delete an event
 */
export async function deleteEvent(id: string): Promise<ApiResponse<null>> {
  try {
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      return {
        success: false,
        message: 'Failed to delete event',
        error: error.message,
      }
    }

    return {
      success: true,
      data: null,
      message: 'Event deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting event',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
