import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ipfs.internal.citizenwallet.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
