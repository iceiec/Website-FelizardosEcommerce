# Contributing Guide

Thank you for your interest in contributing to the Website Felizardos E-Commerce project!

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help others succeed
- Report issues responsibly

## How to Contribute

### 1. Fork and Clone
```bash
git clone https://github.com/your-org/website-felizardosecommerce.git
cd website-felizardosecommerce
git checkout develop
git checkout -b feature/your-feature-name
```

### 2. Set Up Development Environment
```bash
pnpm install
cp .env.example .env.local
# Add your Supabase credentials
pnpm dev
```

### 3. Make Your Changes
- Follow the existing code style
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript types

### 4. Test Your Changes
```bash
# Run linter
pnpm lint

# Test API endpoints
curl http://localhost:3000/api/health
```

### 5. Commit and Push
```bash
git add .
git commit -m "feat: description of your change"
git push origin feature/your-feature-name
```

### 6. Open a Pull Request
- Describe what you changed and why
- Link any related issues
- Wait for code review

## Commit Message Format

Use conventional commits:

```
feat: Add new feature
fix: Fix bug in feature
docs: Update documentation
style: Format code
refactor: Restructure code without changing behavior
test: Add tests
chore: Update dependencies
```

## Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Add JSDoc comments for public functions
- Keep lines under 100 characters

## File Structure

```
app/
  api/
    [endpoint]/
      route.ts         # Handler function
lib/
  [feature].ts         # Business logic
components/
  [Component].tsx      # React component
```

## API Route Example

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { withErrorHandling } from '@/lib/error-handler'

/**
 * GET /api/example
 * Description of what this endpoint does
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  // Implementation
  return NextResponse.json(
    { success: true, data: [] },
    { status: 200 }
  )
})
```

## Pull Request Checklist

- [ ] Code follows style guide
- [ ] Tests pass locally
- [ ] Commits have descriptive messages
- [ ] Documentation is updated
- [ ] No sensitive data committed
- [ ] Ready for production use

## Areas We Need Help

- Backend API improvements
- Database optimization
- Frontend components
- Documentation
- Testing
- Performance optimization

## Questions?

- Check existing issues and PRs
- Ask in pull request comments
- Email the team

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Happy contributing! 🎉
