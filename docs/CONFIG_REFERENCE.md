# Project Configuration Reference

Quick reference for project configuration files and settings.

## Environment Variables

### Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key

### Optional Server-side Only
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key for server operations

⚠️ Never expose service role key to client

## Build Configuration

### next.config.mjs
Next.js configuration:
- React strict mode enabled
- TypeScript support
- Tailwind CSS integration
- Image optimization

### tsconfig.json
- Target: ES6
- Module: ESNext
- Strict type checking enabled
- Path aliases: `@/*` → root directory
- Path aliases: `@/types/*` → types directory

### postcss.config.mjs
PostCSS with Tailwind CSS plugin

### tailwind.config.ts
Tailwind CSS configuration with Radix UI plugins

## Package Management

### pnpm (Recommended)
- Faster than npm
- Lower disk usage
- Strict dependency management

### Commands
```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Development Configuration

### VS Code Extensions Recommended
- ES7+ React/Redux/React-Native snippets
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Directory Aliases

In `tsconfig.json`:
- `@/*` - Root directory
- `@/types/*` - Types directory

Usage in imports:
```typescript
import type { User } from '@/types'
import { supabase } from '@/lib/supabase'
```

## API Response Format

All API responses follow this format:

```typescript
{
  success: boolean
  message: string
  data?: T
  error?: string
}
```

## Naming Conventions

### Files
- Components: PascalCase (`Button.tsx`)
- Pages: kebab-case (`dashboard-page.tsx`)
- Utils: camelCase (`dbHelper.ts`)
- Routes: kebab-case (`route.ts`)

### Variables
- Constants: UPPER_SNAKE_CASE
- Variables: camelCase
- Types: PascalCase

### Functions
- camelCase: `getUserById()`
- Async operations: `asyncGetUser()`

## Git Configuration

### Branches
- `main` - Production
- `develop` - Development
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `docs/*` - Documentation

### Commit Format
```
feat: Add feature
fix: Fix bug
docs: Update docs
style: Format code
refactor: Restructure
test: Add tests
chore: Update deps
```

## Database Configuration

### Supabase Project Settings
- Region: Select closest to your location
- Plan: Free (development) or Pro (production)
- Backup: Automatic daily

### Row Level Security
- Enabled on all tables
- Public read for events/facilities
- User-scoped for profiles/bookings

## Performance Optimization

### Caching
- Next.js static generation: 3600s (1 hour)
- API response caching: Configurable in `lib/config.ts`

### Database Indexes
- Created on: date, event_type, status, organizer_id
- User_id, facility_id in bookings

### Code Splitting
- Automatic with Next.js
- Dynamic imports for heavy components

## Monitoring and Logging

### Logger Utility
Use `logger` from `lib/logger.ts`:
```typescript
import { logger } from '@/lib/logger'

logger.info('User logged in', { userId: '123' })
logger.error('Database error', error)
```

## Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in code
- [ ] CORS configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (via Supabase)
- [ ] XSS prevention (via React)
- [ ] Rate limiting ready

## Deployment Configuration

### Environment Files Needed
- Production: Set variables in hosting platform
- Different keys for each environment
- Never use development keys in production

### Build Optimization
```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

## Troubleshooting

### Port Already in Use
```bash
# Use different port
pnpm dev -- -p 3001
```

### Module Resolution Issues
```bash
# Clear cache
rm -rf .next
pnpm install
```

### Type Errors
```bash
# Check types
pnpm tsc --noEmit
```

## Further Reading

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind Docs](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)

---

Last Updated: January 2024
