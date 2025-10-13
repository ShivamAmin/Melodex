import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      dangerouslyAllowSVG: true,
    },
    output: 'standalone',
};

export default nextConfig;
