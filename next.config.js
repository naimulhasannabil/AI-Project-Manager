/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  experimental: {
    // You can safely leave this empty or add valid experimental features here
  },

  // ❌ Removed onWarning (Next.js doesn’t support this option)
  // If you really need custom warning handling, use a separate Node.js build script instead.

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  env: {
    CLERK_SIGN_IN_URL: "/sign-in",
    CLERK_SIGN_UP_URL: "/sign-up",
    CLERK_AFTER_SIGN_IN_URL: "/dashboard",
    CLERK_AFTER_SIGN_UP_URL: "/dashboard",
  },
};

module.exports = nextConfig;
