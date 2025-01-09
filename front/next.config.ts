import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
