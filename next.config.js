/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next-local",
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
