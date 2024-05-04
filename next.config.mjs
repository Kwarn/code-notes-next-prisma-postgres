/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.clipartmax.com" }],
  },
};

export default nextConfig;
