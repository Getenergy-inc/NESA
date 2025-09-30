import "./lib/edge-polyfill";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DYNAMIC_ROUTES = ['/api/', '/admin', '/sponsors'];

export function middleware(request: NextRequest) {
  // Log the URL for debugging
  console.log("Middleware processing URL:", request.nextUrl.pathname);

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  console.log("Token in middleware:", token);

  // For dynamic routes that should not be cached, add no-cache headers
  if (DYNAMIC_ROUTES.some(path => request.nextUrl.pathname.startsWith(path))) {
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  // For member routes, check if the user is authenticated
  if (request.nextUrl.pathname.startsWith('/member') && !token) {
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
    "/api/:path*",
    "/admin/:path*",
    "/sponsors/:path*",
    "/member/:path*", 
    "/ProfileSetting"
  ],
};