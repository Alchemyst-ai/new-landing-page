/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
      { hostname: "charming-crown-5c60ef85ae.strapiapp.com"}
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
