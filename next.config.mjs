/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
      { hostname: "charming-crown-5c60ef85ae.strapiapp.com" },
      { hostname: "charming-crown-5c60ef85ae.media.strapiapp.com" },
      { hostname: "eloquent-darling-ddaabdd344.media.strapiapp.com" },
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
