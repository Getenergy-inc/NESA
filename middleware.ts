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
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // For admin routes, allow access without authentication
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
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
    "/member/:path*", 
    "/ProfileSetting"
    // Admin routes are no longer protected
    // Exclude "/api/auth/:path*" to avoid edge runtime issues
  ],
};