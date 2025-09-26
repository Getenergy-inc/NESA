import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Polyfill global for edge runtime
if (typeof global === 'undefined') {
  // @ts-ignore
  global = globalThis;
}

export function middleware(request: NextRequest) {
  // Log the URL for debugging
  console.log("Middleware processing URL:", request.nextUrl.pathname);
  
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("Token in middleware:", token);

  // For NextAuth routes, just let them pass through
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // For admin routes, we'll handle authentication in the page components
  // using useSession from next-auth/react
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // For member routes, check if the user is authenticated
  if (!token) {
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
    "/ProfileSetting",
    "/admin/:path*",
    "/api/auth/:path*"
  ],
};