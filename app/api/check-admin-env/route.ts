import { NextResponse } from 'next/server';

export async function GET() {
  // Don't expose the actual password, just check if it's defined
  const adminUsername = process.env.ADMIN_USERNAME;
  const hasAdminPassword = !!process.env.ADMIN_PASSWORD;
  const hasAdminToken = !!process.env.ADMIN_TOKEN;

  return NextResponse.json({
    adminUsername,
    hasAdminPassword,
    hasAdminToken,
    message: 'Admin environment variables check',
  });
}