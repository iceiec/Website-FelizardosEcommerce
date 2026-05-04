/**
 * Error handling utilities
 */

import { NextResponse } from 'next/server'
import { API_CONFIG } from './config'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const createErrorResponse = (statusCode: number, message: string, error?: string) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: error || message,
    },
    { status: statusCode }
  )
}

export const createSuccessResponse = (data: any, message: string, statusCode: number = 200) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  )
}

export const handleApiError = (error: unknown): [statusCode: number, message: string] => {
  if (error instanceof ApiError) {
    return [error.statusCode, error.message]
  }

  if (error instanceof Error) {
    // Database errors
    if (error.message.includes('UNIQUE violation')) {
      return [API_CONFIG.STATUS_CODES.CONFLICT, 'Resource already exists']
    }
    if (error.message.includes('foreign key violation')) {
      return [API_CONFIG.STATUS_CODES.BAD_REQUEST, 'Invalid reference']
    }

    return [API_CONFIG.STATUS_CODES.SERVER_ERROR, error.message]
  }

  return [API_CONFIG.STATUS_CODES.SERVER_ERROR, 'Unknown error occurred']
}

/**
 * Wrap API route handler with error handling
 */
export const withErrorHandling = (
  handler: (request?: any, context?: any) => Promise<NextResponse>
) => {
  return async (request?: any, context?: any) => {
    try {
      return await handler(request, context)
    } catch (error) {
      const [statusCode, message] = handleApiError(error)
      return createErrorResponse(statusCode, message)
    }
  }
}
