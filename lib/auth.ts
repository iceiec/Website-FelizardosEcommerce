import { supabaseAdmin } from './supabase'

export type User = {
  id: string
  email: string
  full_name?: string
  role?: string
  created_at: string
}

export type AuthResponse = {
  success: boolean
  message: string
  user?: User
  error?: string
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      }
    }

    if (data.user) {
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email || '',
          created_at: data.user.created_at,
        },
      }
    }

    return {
      success: false,
      message: 'Authentication failed',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Authentication error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  fullName?: string
): Promise<AuthResponse> {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      }
    }

    if (data.user) {
      // Update user profile if needed
      if (fullName) {
        await supabaseAdmin.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
        })
      }

      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: data.user.id,
          email: data.user.email || '',
          full_name: fullName,
          created_at: data.user.created_at,
        },
      }
    }

    return {
      success: false,
      message: 'Registration failed',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Registration error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify user session
 */
export async function verifySession(token: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !data.user) {
      return null
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      created_at: data.user.created_at,
    }
  } catch (error) {
    return null
  }
}
