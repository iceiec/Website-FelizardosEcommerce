// Global TypeScript types for the application

/**
 * API Response wrapper for all API endpoints
 */
export type ApiResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
  error?: string
}

/**
 * User type for authentication and profile management
 */
export type User = {
  id: string
  email: string
  full_name?: string
  role?: string
  created_at: string
}

/**
 * Event type for event management
 */
export type Event = {
  id: string
  name: string
  description?: string
  date: string
  end_date?: string
  location?: string
  event_type?: string
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  organizer_id?: string
  capacity?: number
  attendees?: number
  created_at: string
  updated_at: string
}

/**
 * Facility type for facility management
 */
export type Facility = {
  id: string
  name: string
  description?: string
  facility_type: 'basketball' | 'pool' | 'pavilion'
  capacity?: number
  status: 'open' | 'closed' | 'maintenance'
  opening_time?: string
  closing_time?: string
  created_at: string
  updated_at: string
}

/**
 * Booking type for facility bookings
 */
export type Booking = {
  id: string
  user_id: string
  facility_id: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

/**
 * Authentication request payload
 */
export type AuthRequest = {
  email: string
  password: string
}

/**
 * Registration request payload
 */
export type RegisterRequest = AuthRequest & {
  fullName?: string
}

/**
 * Database query result wrapper
 */
export type DbResult<T> = {
  data: T | null
  error: Error | null
}

/**
 * Pagination options
 */
export type PaginationOptions = {
  page: number
  limit: number
}

/**
 * Sorting options
 */
export type SortOptions = {
  sortBy: string
  order: 'asc' | 'desc'
}

/**
 * Filter options
 */
export type FilterOptions = {
  [key: string]: string | number | boolean
}

/**
 * API Error response
 */
export type ApiError = {
  success: false
  error: string
  message: string
}

/**
 * Generic list response with pagination
 */
export type ListResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
