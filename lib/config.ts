/**
 * Configuration file for API middleware and utilities
 */

export const API_CONFIG = {
  // Response codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  },

  // Error messages
  ERROR_MESSAGES: {
    INVALID_REQUEST: 'Invalid request',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_PASSWORD: 'Invalid password',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
  },

  // Validation rules
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 128,
    NAME_MAX_LENGTH: 255,
    DESCRIPTION_MAX_LENGTH: 2000,
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  // Rate limiting (optional)
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
  },

  // Cache settings
  CACHE: {
    ENABLED: true,
    TTL_SECONDS: 3600, // 1 hour
  },
} as const
