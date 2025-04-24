/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'archipro.com.au',
      'is1-2.housingcdn.com',
      'images.nobroker.in',
      'housingcdn.com',
      'images.unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React StrictMode for better development experience
  reactStrictMode: true,
  // Configure server settings for Vercel
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app", "*.now.sh"],
    },
  },
};

export default nextConfig;
