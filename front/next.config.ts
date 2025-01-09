import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],

  },

  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
