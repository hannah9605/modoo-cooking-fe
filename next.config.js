/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    reactRoot: true,
  },
};

module.exports = nextConfig;
