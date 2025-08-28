import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* deploy test */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
