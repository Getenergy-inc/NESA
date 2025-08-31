import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

type TokenType = 'email_verification' | 'password_reset' | 'api_access';

interface GenerateTokenParams {
  identifier: string;
  type: TokenType;
  expiresInHours?: number;
}

interface VerifyTokenParams {
  token: string;
  identifier: string;
  type: TokenType;
}

/**
 * Generate a secure token and store it in the database
 */
export async function generateToken({
  identifier,
  type,
  expiresInHours = 24
}: GenerateTokenParams): Promise<string> {
  // Generate a secure random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Calculate expiration date
  const expires = new Date();
  expires.setHours(expires.getHours() + expiresInHours);
  
  // Store the token in the database
  await prisma.verificationToken.upsert({
    where: {
      identifier_type: {
        identifier,
        type
      }
    },
    update: {
      token,
      expires
    },
    create: {
      identifier,
      token,
      type,
      expires
    }
  });
  
  return token;
}

/**
 * Verify a token against the database
 */
export async function verifyToken({
  token,
  identifier,
  type
}: VerifyTokenParams): Promise<boolean> {
  // Find the token in the database
  const storedToken = await prisma.verificationToken.findFirst({
    where: {
      identifier,
      token,
      type,
      expires: { gt: new Date() }
    }
  });
  
  // If token doesn't exist or is expired, return false
  if (!storedToken) {
    return false;
  }
  
  return true;
}

/**
 * Delete a token from the database
 */
export async function deleteToken({
  identifier,
  type
}: {
  identifier: string;
  type: TokenType;
}): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: {
      identifier,
      type
    }
  });
}