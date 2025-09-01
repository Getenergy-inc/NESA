/**
 * Admin authentication utilities
 */

/**
 * Verify an admin token
 * 
 * @param token The admin token to verify
 * @returns Boolean indicating if the token is valid
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  // In a real application, you would verify the token against a JWT secret
  // or check it against a database of valid tokens
  
  // For this demo, we're using a simple comparison with an environment variable
  return token === process.env.ADMIN_TOKEN;
}

/**
 * Get admin token from request headers
 * 
 * @param headers Request headers object
 * @returns The admin token or null if not found
 */
export function getAdminTokenFromHeaders(headers: Headers): string | null {
  const authHeader = headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}

/**
 * Middleware to check if a request is from an admin
 * 
 * @param headers Request headers
 * @returns Boolean indicating if the request is from an admin
 */
export async function isAdminRequest(headers: Headers): Promise<boolean> {
  const token = getAdminTokenFromHeaders(headers);
  
  if (!token) {
    return false;
  }
  
  return await verifyAdminToken(token);
}