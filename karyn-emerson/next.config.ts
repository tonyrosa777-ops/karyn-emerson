import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow both default (75) and higher-quality (85) for hero photography
    qualities: [75, 85],
  },
};

export default nextConfig;
