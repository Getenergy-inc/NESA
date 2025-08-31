import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware should only handle redirects and authentication checks
export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;
  
  // Handle admin routes
  if (
    pathname.startsWith('/admin') && 
    !pathname.startsWith('/admin/login') && 
    !pathname.startsWith('/api/')
  ) {
    // Check for admin token in cookies
    const adminToken = request.cookies.get("adminToken")?.value;
    
    if (!adminToken) {
      // Redirect to admin login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle member routes
  if (pathname.startsWith('/member') || pathname === '/ProfileSetting') {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value;
    
    // Check if the user is authenticated
    if (!token) {
      // Redirect to the login page if not authenticated
      const loginUrl = new URL("/account/login", request.url);
      // Add redirect query param so user can continue to intended page after login
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware only to routes below
export const config = {
  matcher: [
    "/member/:path*", 
    "/ProfileSetting",
    "/admin/:path*"
  ]
};