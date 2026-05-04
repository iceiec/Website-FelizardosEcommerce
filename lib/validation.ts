/**
 * Validation utilities for API requests
 */

import { API_CONFIG } from './config'

export const validateEmail = (email: string): boolean => {
  return API_CONFIG.VALIDATION.EMAIL_REGEX.test(email)
}

export const validatePassword = (password: string): boolean => {
  const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } = API_CONFIG.VALIDATION
  return password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH
}

export const validateName = (name: string): boolean => {
  return name && name.length > 0 && name.length <= API_CONFIG.VALIDATION.NAME_MAX_LENGTH
}

export const validateDateISO = (date: string): boolean => {
  try {
    new Date(date).toISOString()
    return true
  } catch {
    return false
  }
}

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim()
}

export const validateRequest = (data: Record<string, any>, required: string[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  for (const field of required) {
    if (!data[field]) {
      errors.push(`${field} is required`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
