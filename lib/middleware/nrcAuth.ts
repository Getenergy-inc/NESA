import { NextRequest, NextResponse } from 'next/server';

/**
 * NRC Authentication Middleware
 * 
 * This is a template middleware for authenticating NRC API requests.
 * Integrate with your existing authentication system.
 */

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Verify JWT token and extract user information
 * TODO: Implement your JWT verification logic
 */
export async function verifyToken(token: string): Promise<any> {
  // Example implementation - replace with your actual JWT verification
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // return decoded;
    
    // For now, return mock user
    return {
      id: 'user123',
      email: 'user@example.com',
      role: 'volunteer'
    };
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from request headers
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return null;
  }

  // Support both "Bearer token" and "token" formats
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return authHeader;
}

/**
 * Authentication middleware
 * Use this to protect NRC API routes
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<{ authenticated: boolean; user?: any; error?: string }> {
  try {
    // Extract token
    const token = extractToken(request);
    
    if (!token) {
      return {
        authenticated: false,
        error: 'No authentication token provided'
      };
    }

    // Verify token
    const user = await verifyToken(token);
    
    if (!user) {
      return {
        authenticated: false,
        error: 'Invalid or expired token'
      };
    }

    return {
      authenticated: true,
      user
    };
  } catch (error: any) {
    return {
      authenticated: false,
      error: error.message || 'Authentication failed'
    };
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: any, requiredRoles: string[]): boolean {
  if (!user || !user.role) {
    return false;
  }

  return requiredRoles.includes(user.role);
}

/**
 * Check if user is admin
 */
export function isAdmin(user: any): boolean {
  return hasRole(user, ['admin', 'super_admin']);
}

/**
 * Check if user is NRC volunteer
 */
export function isVolunteer(user: any): boolean {
  return hasRole(user, ['volunteer', 'coordinator', 'team_lead', 'admin']);
}

/**
 * Middleware wrapper for protected routes
 * 
 * Usage in API route:
 * ```typescript
 * import { withAuth } from '@/lib/middleware/nrcAuth';
 * 
 * export async function GET(request: NextRequest) {
 *   const authResult = await withAuth(request);
 *   if (!authResult.authenticated) {
 *     return NextResponse.json(
 *       { success: false, message: authResult.error },
 *       { status: 401 }
 *     );
 *   }
 *   
 *   const user = authResult.user;
 *   // Your route logic here
 * }
 * ```
 */
export async function withAuth(request: NextRequest) {
  return await authenticateRequest(request);
}

/**
 * Middleware wrapper for admin-only routes
 */
export async function withAdminAuth(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  
  if (!authResult.authenticated) {
    return authResult;
  }

  if (!isAdmin(authResult.user)) {
    return {
      authenticated: false,
      error: 'Admin access required'
    };
  }

  return authResult;
}

/**
 * Middleware wrapper for volunteer routes
 */
export async function withVolunteerAuth(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  
  if (!authResult.authenticated) {
    return authResult;
  }

  if (!isVolunteer(authResult.user)) {
    return {
      authenticated: false,
      error: 'Volunteer access required'
    };
  }

  return authResult;
}

/**
 * Rate limiting helper
 * TODO: Implement rate limiting logic
 */
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  limit: number = 100,
  windowMs: number = 60000
): Promise<{ allowed: boolean; remaining: number }> {
  // Example implementation - replace with your actual rate limiting
  // You can use Redis, in-memory cache, or database
  
  return {
    allowed: true,
    remaining: limit
  };
}

/**
 * Example usage in an API route:
 * 
 * ```typescript
 * import { NextRequest, NextResponse } from 'next/server';
 * import { withAuth, checkRateLimit } from '@/lib/middleware/nrcAuth';
 * 
 * export async function POST(request: NextRequest) {
 *   // Authenticate
 *   const authResult = await withAuth(request);
 *   if (!authResult.authenticated) {
 *     return NextResponse.json(
 *       { success: false, message: authResult.error },
 *       { status: 401 }
 *     );
 *   }
 *   
 *   const user = authResult.user;
 *   
 *   // Check rate limit
 *   const rateLimit = await checkRateLimit(user.id, '/api/v1/nrc/nominees', 10, 60000);
 *   if (!rateLimit.allowed) {
 *     return NextResponse.json(
 *       { success: false, message: 'Rate limit exceeded' },
 *       { status: 429 }
 *     );
 *   }
 *   
 *   // Your route logic here
 *   // ...
 * }
 * ```
 */
