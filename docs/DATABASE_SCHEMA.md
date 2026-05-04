# Database Schema

This document describes the Supabase database schema for the Website Felizardos E-Commerce application.

## Tables

### 1. auth.users (Built-in Supabase Table)

Automatically managed by Supabase Auth. Stores user authentication data.

```sql
CREATE TABLE auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255),
  email_confirmed_at TIMESTAMP,
  invited_at TIMESTAMP,
  confirmation_token VARCHAR(255),
  confirmation_sent_at TIMESTAMP,
  recovery_token VARCHAR(255),
  recovery_sent_at TIMESTAMP,
  email_change_token_new VARCHAR(255),
  email_change VARCHAR(255),
  email_change_sent_at TIMESTAMP,
  last_sign_in_at TIMESTAMP,
  raw_app_meta_data JSONB,
  raw_user_meta_data JSONB,
  is_super_admin BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  phone VARCHAR(15),
  phone_confirmed_at TIMESTAMP,
  phone_change VARCHAR(15),
  phone_change_token VARCHAR(255),
  phone_change_sent_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  email_change_token_current VARCHAR(255),
  email_change_confirm_status SMALLINT,
  banned_until TIMESTAMP,
  reauthentication_token VARCHAR(255),
  reauthentication_sent_at TIMESTAMP,
  is_sso_user BOOLEAN
);
```

### 2. profiles

Extended user profile information (optional).

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone_number VARCHAR(20),
  bio TEXT,
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles" ON profiles
  USING (auth.jwt() ->> 'role' = 'service_role');
```

### 3. events

Event management table for calendar and event tracking.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR(255),
  event_type VARCHAR(50), -- 'basketball', 'maintenance', 'pavilion', 'pool', 'other'
  status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  capacity INT,
  attendees INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer ON events(organizer_id);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" ON events
  FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events" ON events
  FOR DELETE USING (auth.uid() = organizer_id);
```

### 4. facilities

Facility management for different areas (basketball, pool, pavilion, maintenance).

```sql
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  facility_type VARCHAR(50) NOT NULL, -- 'basketball', 'pool', 'pavilion'
  capacity INT,
  status VARCHAR(50) DEFAULT 'open', -- 'open', 'closed', 'maintenance'
  opening_time TIME,
  closing_time TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read facilities" ON facilities
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage facilities" ON facilities
  USING (auth.jwt() ->> 'role' = 'service_role');
```

### 5. bookings (Optional)

For facility booking management.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_facility ON bookings(facility_id);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);
```

## Relationships

```
auth.users (1) ──→ (Many) profiles
auth.users (1) ──→ (Many) events
auth.users (1) ──→ (Many) bookings
facilities (1) ──→ (Many) bookings
events (0-1) ──→ (Many) attendees
```

## Indexes

For optimal query performance, the following indexes are created:

- `idx_events_date` - On `events(date)`
- `idx_events_type` - On `events(event_type)`
- `idx_events_status` - On `events(status)`
- `idx_events_organizer` - On `events(organizer_id)`
- `idx_bookings_user` - On `bookings(user_id)`
- `idx_bookings_facility` - On `bookings(facility_id)`
- `idx_bookings_start_time` - On `bookings(start_time)`

## Row Level Security (RLS) Policies

All tables have RLS enabled with appropriate policies:

- **Public Read**: Events and facilities can be read by anyone
- **Authenticated Only**: Users can only see/modify their own data
- **Service Role**: Backend can manage data with service role key

## Setup Instructions

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and paste the table creation SQL
4. Execute the queries
5. Verify tables are created in the Database tab

## Backup and Maintenance

- Regular automated backups are handled by Supabase
- Manual backups can be taken from Supabase Dashboard
- Test restores regularly
