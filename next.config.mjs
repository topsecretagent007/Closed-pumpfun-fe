/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['ipfs.io', 'scarlet-extra-cat-880.mypinata.cloud', 'gateway.pinata.cloud'], // Add gateway.pinata.cloud here
  },
};

export default nextConfig;
