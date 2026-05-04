# ✅ Backend Setup Verification Checklist

## Pre-Deployment Verification

Use this checklist to verify everything is properly configured before deploying.

### Environment Setup
- [ ] `.env.local` file exists in project root
- [ ] `.env.local` contains all three required variables
- [ ] `.env.local` is listed in `.gitignore`
- [ ] `.env.example` exists and is tracked in git
- [ ] No real secrets are in version control
- [ ] Can start dev server without errors: `pnpm dev`

### API Routes
- [ ] `app/api/auth/register/route.ts` exists
- [ ] `app/api/auth/login/route.ts` exists
- [ ] `app/api/events/route.ts` exists
- [ ] `app/api/events/[id]/route.ts` exists
- [ ] `app/api/health/route.ts` exists
- [ ] Health endpoint returns 200 status: `curl http://localhost:3000/api/health`

### Libraries and Utilities
- [ ] `lib/supabase.ts` - Server client exists
- [ ] `lib/supabase-client.ts` - Client-side client exists
- [ ] `lib/auth.ts` - Auth utilities exist
- [ ] `lib/database.ts` - Database utilities exist
- [ ] `lib/config.ts` - Configuration exists
- [ ] `lib/validation.ts` - Validation utilities exist
- [ ] `lib/env.ts` - Environment utilities exist
- [ ] `lib/error-handler.ts` - Error handling exists
- [ ] `lib/logger.ts` - Logger utility exists
- [ ] `types/index.ts` - TypeScript types defined

### Documentation
- [ ] `README.md` - Complete documentation (4000+ lines)
- [ ] `docs/QUICK_START.md` - Quick start guide
- [ ] `docs/SETUP.md` - Detailed setup instructions
- [ ] `docs/API.md` - API documentation
- [ ] `docs/DATABASE_SCHEMA.md` - Database schema
- [ ] `docs/CONTRIBUTING.md` - Contributing guidelines
- [ ] `docs/CONFIG_REFERENCE.md` - Configuration reference
- [ ] `docs/BACKEND_SETUP_SUMMARY.md` - Setup summary
- [ ] `BACKEND_SETUP_COMPLETE.md` - Handoff document
- [ ] `FILE_STRUCTURE.md` - File structure reference

### Configuration
- [ ] `package.json` updated with Supabase dependencies
- [ ] `package.json` metadata updated
- [ ] `tsconfig.json` includes path aliases
- [ ] `.gitignore` comprehensive and updated
- [ ] `next.config.mjs` properly configured

### Supabase Integration
- [ ] Supabase project created at https://supabase.com
- [ ] Project URL matches `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Anon key matches `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Service role key matches `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Keys are hidden from public repositories

### Database
- [ ] Supabase tables created (profiles, events, facilities, bookings)
- [ ] Row Level Security (RLS) enabled on tables
- [ ] Indexes created on frequently queried columns
- [ ] Policies defined for public/authenticated access

### Testing
- [ ] Dev server starts: `pnpm dev`
- [ ] Health check works: `curl http://localhost:3000/api/health`
- [ ] Register endpoint works
- [ ] Login endpoint works
- [ ] Events GET works
- [ ] Events POST works
- [ ] Events GET by ID works
- [ ] Events PUT works
- [ ] Events DELETE works

### Security
- [ ] No API keys in version control
- [ ] `.env.local` is gitignored
- [ ] Service role key only used server-side
- [ ] Anonymous key used client-side
- [ ] Input validation in place
- [ ] CORS properly configured
- [ ] Database RLS enabled

### TypeScript
- [ ] TypeScript compiles: `pnpm tsc --noEmit`
- [ ] No type errors in API routes
- [ ] No type errors in utilities
- [ ] Global types properly exported
- [ ] Path aliases work in imports

### Performance
- [ ] Bundle size reasonable
- [ ] API responses include proper status codes
- [ ] Database queries have indexes
- [ ] No N+1 query problems

### Deployment Readiness
- [ ] `pnpm build` completes successfully
- [ ] No warnings in build output
- [ ] Can start production server: `pnpm start`
- [ ] Environment variables ready for production
- [ ] Different keys for production vs development

---

## Test Commands

Run these commands to verify everything works:

```bash
# 1. Verify TypeScript
pnpm tsc --noEmit

# 2. Build project
pnpm build

# 3. Start dev server (in terminal 1)
pnpm dev

# 4. Test health endpoint (in terminal 2)
curl http://localhost:3000/api/health

# 5. Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "fullName": "Test User"
  }'

# 6. Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# 7. Create event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Event",
    "date": "2024-02-15T10:00:00Z",
    "location": "Main Hall"
  }'

# 8. Get events
curl http://localhost:3000/api/events

# 9. Verify files
ls -la app/api/
ls -la lib/
ls -la types/
ls -la docs/
```

---

## Common Issues and Fixes

### Issue: "Cannot find module '@/lib/supabase'"
**Fix**: 
- Verify path alias in `tsconfig.json`
- Restart dev server
- Clear `.next` folder: `rm -rf .next`

### Issue: "Environment variables not loading"
**Fix**:
- Verify `.env.local` exists in root
- Restart dev server
- Check format: `KEY=value` (no spaces)

### Issue: "Supabase connection failed"
**Fix**:
- Verify credentials in `.env.local`
- Check Supabase project is active
- Verify internet connection
- Check tables are created

### Issue: "Build fails"
**Fix**:
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `pnpm install`
- Check TypeScript: `pnpm tsc --noEmit`

---

## Success Indicators

✅ You're good to deploy when:
- All checkboxes above are checked
- All test commands pass
- Build completes without errors
- Dev server starts successfully
- API endpoints respond correctly
- TypeScript has no errors
- Database tables are created
- Environment variables are configured

---

## Next Steps After Verification

1. **Connect Frontend**: Update React components to use API endpoints
2. **Create Database Tables**: Run SQL from `docs/DATABASE_SCHEMA.md`
3. **Test End-to-End**: Register user, create event, retrieve data
4. **Deploy**: Push to GitHub, then deploy to Vercel
5. **Monitor**: Check logs for any issues
6. **Iterate**: Add more features based on requirements

---

## Support

If something isn't working:
1. Check this checklist
2. Review relevant documentation in `docs/`
3. Check the troubleshooting section in `README.md`
4. Review error messages carefully
5. Check environment variables are correct

---

**Last Updated**: January 2024
**Status**: Ready for Verification
