/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },

  // ✅ Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore TypeScript errors during Docker build
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Helps avoid pre-rendering issues with useSearchParams in Next.js 15
  experimental: {
    reactCompiler: false,
  },
};

module.exports = nextConfig;
