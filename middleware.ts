// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Optional route matcher
export const config = {
  matcher: [
    // Protect everything except static files and the homepage
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
