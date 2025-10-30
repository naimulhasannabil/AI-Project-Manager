import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Handle theme persistence middleware
export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  
  // Handle theme persistence
  const theme = req.cookies.get('theme')?.value || 'system';
  if (!req.cookies.has('theme')) {
    response.cookies.set('theme', theme, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Only run on specific paths where we want to persist theme
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
