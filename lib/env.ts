/**
 * Environment variable validation and setup
 */

const REQUIRED_ENV_VARS = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']

const OPTIONAL_ENV_VARS = ['SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_ANALYTICS_ID']

/**
 * Validate that all required environment variables are set
 */
export function validateEnvironment(): void {
  const missing: string[] = []

  // Check required variables
  for (const variable of REQUIRED_ENV_VARS) {
    if (!process.env[variable]) {
      missing.push(variable)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      `Please check your .env.local file and make sure it contains all required variables.`
    )
  }
}

/**
 * Get an environment variable with a default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key]
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value || defaultValue || ''
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}

/**
 * Get Supabase configuration
 */
export function getSupabaseConfig() {
  return {
    url: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnv('SUPABASE_SERVICE_ROLE_KEY', ''),
  }
}
