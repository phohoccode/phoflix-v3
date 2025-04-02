import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["phimimg.com", "lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      allowCollectingMemory: true,
    }
    return config;
  }
};

export default nextConfig;
