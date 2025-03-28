import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["phimimg.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
