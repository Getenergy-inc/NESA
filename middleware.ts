import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("Token in middleware:", token);


  // Check if the user is authenticated
  if (!token) {
    // Redirect to the login page if not authenticated
    const loginUrl = new URL("/account/login", request.url);
    // Add redirect query param so user can continue to intended page after login
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Apply middleware only to routes below
// TEMPORARILY DISABLED: Judge routes and nominateform authentication removed for development/testing
export const config = {
  matcher: ["/member/:path*", "/ProfileSetting"],
  // Temporarily removed: "/judge/:path*", "/nominateform"
};