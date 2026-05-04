/**
 * Logger utility for debugging and monitoring
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
    }
  }

  info(message: string, data?: any): void {
    const entry = this.formatLog('info', message, data)
    console.log(`[${entry.level.toUpperCase()}] ${message}`, data || '')
  }

  warn(message: string, data?: any): void {
    const entry = this.formatLog('warn', message, data)
    console.warn(`[${entry.level.toUpperCase()}] ${message}`, data || '')
  }

  error(message: string, error?: any): void {
    const entry = this.formatLog('error', message, error)
    console.error(`[${entry.level.toUpperCase()}] ${message}`, error || '')
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      const entry = this.formatLog('debug', message, data)
      console.debug(`[${entry.level.toUpperCase()}] ${message}`, data || '')
    }
  }

  table(data: any[]): void {
    if (this.isDevelopment) {
      console.table(data)
    }
  }
}

export const logger = new Logger()
