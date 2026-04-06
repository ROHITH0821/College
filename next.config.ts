import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Hide the floating “N” dev tools indicator in development */
  devIndicators: false,
  poweredByHeader: false,
  experimental: {
    /** Smaller client bundles for icon imports used across many components */
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    /** Must list every `quality` passed to `<Image />` (Next.js 16+). Default is `[75]` only. */
    qualities: [75, 85, 88, 90, 92, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
