# Setup Guide

Complete step-by-step guide to set up the Website Felizardos E-Commerce application.

## Prerequisites

- **Node.js**: Version 18.0 or higher
- **pnpm**: Version 8.0 or higher (or npm/yarn as alternatives)
- **Git**: For version control
- **Supabase Account**: Free account at https://supabase.com

## Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd website-felizardosecommerce

# Install dependencies
pnpm install
```

## Step 2: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - **Name**: website-felizardos
   - **Database Password**: Create a strong password
   - **Region**: Choose closest region
   - **Pricing Plan**: Free (sufficient for development)
4. Click "Create new project"
5. Wait for project to be created (2-3 minutes)

## Step 3: Get Your API Keys

1. In Supabase Dashboard, go to "Settings" → "API"
2. Copy the following:
   - **Project URL** (under "URL")
   - **Anon Public Key** (under "Project API keys")
   - **Service Role Secret** (under "Project API keys")

## Step 4: Configure Environment Variables

1. In the project root, create or edit `.env.local`:

```bash
# Copy from example
cp .env.example .env.local

# Edit .env.local
# Windows
notepad .env.local
# macOS/Linux
nano .env.local
```

2. Fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **Do NOT share these keys!** They are secrets.

## Step 5: Set Up Database Tables

### Option A: Using Supabase Dashboard

1. Open Supabase Dashboard
2. Go to "SQL Editor"
3. Click "New query"
4. Copy and paste the SQL from [docs/DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
5. Click "Run"

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

## Step 6: Verify Setup

```bash
# Start development server
pnpm dev

# In another terminal, test health endpoint
curl http://localhost:3000/api/health

# Should return:
# {"status":"healthy","timestamp":"...","environment":"development"}
```

## Step 7: Create Test User (Optional)

You can create test data directly in Supabase:

1. Go to "Auth" → "Users" in Dashboard
2. Click "Add user"
3. Enter email and password
4. Click "Create user"

Or use the API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "fullName": "Test User"
  }'
```

## Step 8: Verify Database Connection

Test that the app can connect to the database:

```bash
# Create an event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Event",
    "description": "Test event description",
    "date": "2024-02-15T10:00:00Z",
    "location": "Test Location"
  }'

# Get all events
curl http://localhost:3000/api/events
```

## Development Workflow

### Starting the Development Server

```bash
pnpm dev
```

Server runs at: http://localhost:3000

### Building for Production

```bash
pnpm build
pnpm start
```

### Code Quality

```bash
# Run linter
pnpm lint

# Run type checking
pnpm tsc
```

## Project Structure

```
app/
├── api/                    # API routes
├── dashboard/              # Dashboard pages
├── login/                  # Authentication pages
└── layout.tsx             # Root layout

lib/
├── supabase.ts            # Server client
├── supabase-client.ts     # Client-side client
├── auth.ts                # Auth utilities
├── database.ts            # Database utilities
└── utils.ts               # Helper functions

components/
├── ui/                    # UI components
└── dashboard/             # Page components

docs/
├── DATABASE_SCHEMA.md     # Database documentation
├── API.md                 # API documentation
└── SETUP.md               # This file
```

## Common Issues and Solutions

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not configured"

**Solution**:
1. Check `.env.local` exists in project root
2. Verify all three environment variables are set
3. Restart development server: `pnpm dev`

### Issue: "Failed to connect to database"

**Solution**:
1. Verify Supabase project is active
2. Check Project URL is correct
3. Verify internet connection
4. Ensure Supabase tables are created

### Issue: "Authentication failed"

**Solution**:
1. Verify user exists in Supabase Auth
2. Check password is correct
3. Verify email format
4. Review Supabase Auth settings

### Issue: "CORS errors in browser"

**Solution**:
1. Check browser console for exact error
2. Verify API endpoint URL is correct
3. Check `.env.local` variables
4. Restart development server

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts and add environment variables in Vercel dashboard.

### Deploy to Other Platforms

For Netlify, Railway, Heroku, etc.:

1. Connect your Git repository
2. Add environment variables in platform dashboard
3. Set build command: `pnpm build`
4. Set start command: `pnpm start`

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] API keys are not committed to GitHub
- [ ] Different keys for development and production
- [ ] HTTPS enabled in production
- [ ] Row Level Security (RLS) enabled on tables
- [ ] Regular backups configured
- [ ] Input validation implemented

## Next Steps

1. Read [docs/API.md](./API.md) for API documentation
2. Read [docs/DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database details
3. Check [README.md](../README.md) for project overview
4. Create additional API routes as needed
5. Add authentication middleware for protected routes

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Team Notes

- Development branch: `develop`
- Production branch: `main`
- Feature branches: `feature/*`
- Code reviews required before merging

---

**Created**: January 2024
**Last Updated**: January 2024
**Status**: Active Development
