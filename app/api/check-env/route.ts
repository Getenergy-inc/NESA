import { NextResponse } from 'next/server';

export async function GET() {
  // Check if environment variables are defined
  const hasAdminUsername = !!process.env.ADMIN_USERNAME;
  const hasAdminPassword = !!process.env.ADMIN_PASSWORD;
  const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
  const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
  
  // Don't expose actual values for security reasons
  return NextResponse.json({
    hasAdminUsername,
    hasAdminPassword,
    hasNextAuthSecret,
    hasNextAuthUrl,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    message: 'Environment variables check'
  });
}