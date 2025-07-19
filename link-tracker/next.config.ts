/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 🚨 Isso permite builds mesmo com erros TypeScript
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
