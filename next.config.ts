import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ca',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
