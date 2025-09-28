import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log the URL for debugging
  console.log("Middleware processing URL:", request.nextUrl.pathname);
  
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  // Also check for next-auth.session-token which is used by NextAuth
  const nextAuthToken = request.cookies.get("next-auth.session-token")?.value || 
                        request.cookies.get("__Secure-next-auth.session-token")?.value;
  
  console.log("Token in middleware:", token);
  console.log("NextAuth token in middleware:", nextAuthToken ? "Found" : "Not found");

  // For NextAuth routes, just let them pass through
  // Add a header to prevent caching for these dynamic routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // For admin routes, allow access without authentication
  // But add a header to prevent caching for these routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // For sponsor routes, add no-cache headers
  if (request.nextUrl.pathname.startsWith('/sponsors')) {
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // For member routes, check if the user is authenticated
  if (request.nextUrl.pathname.startsWith('/member') && !token && !nextAuthToken) {
    // Redirect to the login page if not authenticated
    const loginUrl = new URL("/account/login", request.url);
    // Add redirect query param so user can continue to intended page after login
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Apply middleware only to routes below
export const config = {
  matcher: [
    "/api/auth/:path*",
    "/admin/:path*",
    "/sponsors/:path*",
    "/member/:path*", 
    "/ProfileSetting"
  ],
};