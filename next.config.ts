import type { NextConfig } from "next";

<<<<<<< HEAD
const nextConfig: NextConfig = {
  output: "standalone",
=======
const apiUrl = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      // fallback: Next.js App Router route handlers at /api/* take priority;
      // anything without a matching route.ts falls through to the Express backend.
      fallback: [
        {
          source: "/api/:path*",
          destination: `${apiUrl}/api/:path*`,
        },
      ],
    };
  },
>>>>>>> master
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "embed-fastly.wistia.com",
      },
<<<<<<< HEAD
=======
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
>>>>>>> master
    ],
  },
};

export default nextConfig;
