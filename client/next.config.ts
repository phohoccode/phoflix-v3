import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["phimimg.com", "lh3.googleusercontent.com"],
  },

  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.cache = {
  //       type: "filesystem",
  //       version: "1.0",
  //       store: "pack",
  //       buildDependencies: {
  //         config: [__filename],
  //       },
  //       compression: "brotli", // Nén cache bằng Brotli
  //       cacheDirectory: path.resolve(__dirname, ".next/cache/webpack"),
  //       allowCollectingMemory: true,
  //       maxMemoryGenerations: 10,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
