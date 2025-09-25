/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "randomuser.me" },
      { hostname: "images.unsplash.com" },
      { hostname: process.env.STRAPI_API_URL}
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
