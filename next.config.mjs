/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
      { hostname: "blog-cms-4500e5720eebb1f17f453cb9.getalchemystai.com"}
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
