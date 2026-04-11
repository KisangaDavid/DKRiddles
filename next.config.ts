import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true }, // TODO: look at this
  trailingSlash: true,
};

export default nextConfig;
