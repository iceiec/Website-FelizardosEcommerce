# Website Felizardos E-Commerce Dashboard

A full-stack e-commerce dashboard application built with **Next.js**, **Supabase**, and **TypeScript**. This project provides a complete backend API integrated with a Supabase PostgreSQL database.

## 🚀 Features

- **User Authentication**: User registration and login via Supabase Auth
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Database Integration**: PostgreSQL database via Supabase
- **Type Safety**: Full TypeScript support throughout
- **Responsive UI**: Radix UI components with Tailwind CSS
- **Real-time Updates**: Supabase real-time subscriptions ready
- **Dashboard Pages**: Basketball, maintenance, pavilion, and pool management
- **Event Calendar**: Calendar-based event management

## 📋 Project Structure

```
website-felizardosecommerce/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── login/         # POST /api/auth/login
│   │   │   └── register/      # POST /api/auth/register
│   │   ├── events/            # Event management endpoints
│   │   │   ├── route.ts       # GET /api/events, POST /api/events
│   │   │   └── [id]/route.ts  # GET/PUT/DELETE /api/events/[id]
│   │   └── health/            # Health check endpoint
│   ├── dashboard/             # Dashboard pages
│   ├── login/                 # Login page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (redirects to login/dashboard)
│   └── globals.css            # Global styles
├── components/                # Reusable React components
│   ├── ui/                   # Radix UI components
│   └── dashboard/            # Dashboard-specific components
├── lib/                       # Utility functions and helpers
│   ├── supabase.ts           # Server-side Supabase client
│   ├── supabase-client.ts    # Client-side Supabase client
│   ├── auth.ts               # Authentication utilities
│   ├── database.ts           # Database utilities
│   └── utils.ts              # Helper functions
├── hooks/                     # Custom React hooks
├── public/                    # Static assets
├── styles/                    # CSS files
├── .env.local                 # Local environment variables (⚠️ DO NOT COMMIT)
├── .env.example               # Example environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
├── next.config.mjs            # Next.js configuration
└── README.md                  # This file
```

## 🔐 Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yourprojectid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key_here
SUPABASE_SERVICE_ROLE_KEY=your_secret_key_here
```

⚠️ **Security Warning**: 
- **NEVER** commit `.env.local` to version control
- `.env.local` is already in `.gitignore`
- Use `.env.example` as a template for new environments
- Keep secret keys safe and rotate them regularly

## 📦 Dependencies

### Core Framework
- **Next.js 16.2.0**: React framework for production
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript

### Backend & Database
- **@supabase/supabase-js**: Supabase JavaScript client
- **@supabase/auth-helpers-nextjs**: Next.js authentication helpers
- **@supabase/auth-helpers-react**: React authentication helpers

### UI & Styling
- **Radix UI**: Headless component library
- **Tailwind CSS 4.2**: Utility-first CSS framework
- **Lucide React**: Icon library

### Form & Validation
- **React Hook Form**: Efficient form handling
- **Zod**: TypeScript-first schema validation

### Other
- **date-fns**: Date manipulation library
- **recharts**: React charting library
- **sonner**: Toast notifications
- **next-themes**: Theme management

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account (free tier available at https://supabase.com)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd website-felizardosecommerce
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
# Get your credentials from: https://app.supabase.com/projects
```

### 4. Set Up Supabase Database

#### Create Tables

1. **users** (handled by Supabase Auth)
   - Supabase automatically creates the `auth.users` table

2. **profiles** (optional - for additional user data)
   ```sql
   CREATE TABLE profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email VARCHAR(255) NOT NULL,
     full_name VARCHAR(255),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **events** (for event management)
   ```sql
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

#### Enable Row Level Security (RLS)
```sql
-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies (example for authenticated users)
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (true);
```

### 5. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Events

#### Get All Events
```http
GET /api/events
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Events fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Event Name",
      "description": "Event description",
      "date": "2024-01-15T10:00:00Z",
      "location": "Location",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Event by ID
```http
GET /api/events/{id}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Event fetched successfully",
  "data": {
    "id": "uuid",
    "name": "Event Name",
    "description": "Event description",
    "date": "2024-01-15T10:00:00Z",
    "location": "Location",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Create Event
```http
POST /api/events
Content-Type: application/json

{
  "name": "Event Name",
  "description": "Event description",
  "date": "2024-01-15T10:00:00Z",
  "location": "Location"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": "uuid",
    "name": "Event Name",
    "description": "Event description",
    "date": "2024-01-15T10:00:00Z",
    "location": "Location",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Update Event
```http
PUT /api/events/{id}
Content-Type: application/json

{
  "name": "Updated Event Name",
  "description": "Updated description"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Event Name",
    "description": "Updated description",
    "date": "2024-01-15T10:00:00Z",
    "location": "Location",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Delete Event
```http
DELETE /api/events/{id}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### Health Check

#### Check API Health
```http
GET /api/health
```

**Response (200)**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "environment": "development"
}
```

## 📝 Usage Examples

### Using Supabase Client in Components

**Server-side (API Routes)**:
```typescript
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
}
```

**Client-side**:
```typescript
'use client'

import { supabase } from '@/lib/supabase-client'

export function EventList() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .then(({ data }) => setEvents(data))
  }, [])
}
```

### Authentication Flow

```typescript
// Register
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password',
    fullName: 'John Doe'
  })
})

// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
})

const { user } = await response.json()
```

## 🏗️ Building for Production

### Build the Application
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Environment Setup for Production
1. Create a `.env.production` file (or set environment variables in your hosting platform)
2. Update `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with production Supabase credentials
3. Set `SUPABASE_SERVICE_ROLE_KEY` in your server environment (never expose publicly)

## 🔒 Security Best Practices

1. **Environment Variables**: 
   - Never commit `.env.local` 
   - Use different credentials for development and production
   - Rotate keys regularly

2. **Row Level Security (RLS)**:
   - Always enable RLS on sensitive tables
   - Define appropriate access policies

3. **API Security**:
   - Validate all user input
   - Use CORS configuration appropriately
   - Implement rate limiting for sensitive endpoints

4. **Database**:
   - Use parameterized queries (already handled by Supabase client)
   - Implement proper authorization checks
   - Regular backups

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
vercel
```

### Deploy to Other Platforms
- Netlify
- Railway
- Heroku
- DigitalOcean

See [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ❓ Troubleshooting

### Connection Issues
- Verify Supabase URL and keys are correct
- Check internet connection
- Ensure Supabase project is active

### Authentication Errors
- Verify user exists in Supabase Auth
- Check password requirements
- Review Supabase Auth settings

### Database Errors
- Ensure tables are created in Supabase
- Check Row Level Security policies
- Verify user permissions

### Build Issues
- Run `pnpm clean` and `pnpm install`
- Clear Next.js cache: `rm -rf .next`
- Check Node.js version compatibility

## 📧 Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with detailed information
- Contact the development team

---

**Last Updated**: January 2024
**Version**: 0.1.0
**Status**: Active Development
