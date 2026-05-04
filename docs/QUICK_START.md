# Quick Start Guide

Get the Website Felizardos E-Commerce application running in 5 minutes!

## Prerequisites

- Node.js 18+
- pnpm
- Supabase account (free tier OK)

## Quick Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit and add your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Create Database Tables
Go to Supabase Dashboard → SQL Editor and run:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Start Development Server
```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Test the API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }'
```

### Create Event
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Event",
    "date": "2024-02-15T10:00:00Z",
    "location": "Main Hall"
  }'
```

### Get Events
```bash
curl http://localhost:3000/api/events
```

## Next Steps

1. Read [docs/SETUP.md](./docs/SETUP.md) for detailed setup
2. Check [docs/API.md](./docs/API.md) for API documentation
3. Review [docs/DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) for database info
4. Customize the dashboard pages in `app/dashboard/`
5. Add your business logic to API routes

## Troubleshooting

**Environment variables not loading?**
- Restart dev server: `pnpm dev`
- Check `.env.local` exists in project root
- Verify format: `KEY=value` (no spaces around `=`)

**Database connection errors?**
- Verify Supabase project is active
- Check URL and keys are correct
- Ensure tables are created
- Check internet connection

**Port 3000 already in use?**
- Use different port: `pnpm dev -- -p 3001`

## Project Links

- [GitHub](https://github.com/your-org/website-felizardosecommerce)
- [Supabase Dashboard](https://app.supabase.com)
- [Documentation](./docs)
- [API Docs](./docs/API.md)

## Need Help?

See [README.md](./README.md) for complete documentation.
