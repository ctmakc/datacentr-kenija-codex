/** @type {import('next').NextConfig} */
const customDistDir =
  process.env.NEXT_DEV_DIST_DIR || (process.env.NODE_ENV === "development" ? ".next-dev" : undefined);

const nextConfig = {
  ...(customDistDir ? { distDir: customDistDir } : {}),
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    // Disable webpack persistent cache due to recurring Windows cache corruption.
    config.cache = false;
    return config;
  }
};

module.exports = nextConfig;
