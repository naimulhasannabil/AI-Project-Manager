import { clerkMiddleware } from "@clerk/nextjs/server";

// Export the Clerk middleware with default configuration
// This will protect all routes and handle authentication
export default clerkMiddleware({});

// Stop Middleware running on static files but enable on API routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'
  ],
};
