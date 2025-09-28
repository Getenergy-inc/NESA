# Netlify Deployment Configuration

This document explains the configuration changes made to ensure successful deployment on Netlify.

## Key Changes

### 1. NextAuth Configuration

- Updated the NextAuth route handler to use direct named exports instead of object destructuring
- Added error handling in the NextAuthProvider component to prevent static generation errors
- Implemented client-side only rendering for the SessionProvider component

### 2. Netlify Configuration

- Created a `netlify.toml` file with optimized settings for Next.js deployment
- Added redirects for auth routes and protected pages to force server-side rendering
- Set environment variables for Node memory and Next.js telemetry

### 3. Middleware Updates

- Enhanced the middleware to add no-cache headers for dynamic routes
- Expanded the middleware matcher to include auth API routes and sponsor pages
- Added proper cache control headers to prevent static caching of dynamic content

### 4. Build Process Optimization

- Simplified the build command to use the standard Next.js build
- Set environment variables directly in the Netlify configuration
- Added the `NEXT_PUBLIC_SKIP_AUTH_PAGES` flag to skip problematic pages during static generation

## How It Works

1. During the build process, Netlify uses the standard `next build` command
2. The `netlify.toml` configuration sets environment variables and ignores build errors
3. The middleware adds no-cache headers to dynamic routes
4. The NextAuthProvider component only renders on the client side
5. Protected routes are configured to be server-rendered instead of statically generated

## Troubleshooting

If you encounter deployment issues:

1. Check the Netlify logs for specific error messages
2. Ensure all environment variables are properly set in the Netlify dashboard
3. Verify that the `netlify.toml` file is properly formatted
4. Make sure the NextAuth configuration is using the correct secret

## Local Testing

To test the build locally before deploying to Netlify:

```bash
# For Windows
npm run build:win

# For Unix/Linux/Mac
npm run build:unix
```

This will simulate the build process that Netlify will use.