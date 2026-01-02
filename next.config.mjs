/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "getalchemystai.com" },
      { hostname: "drive.google.com" },
      { hostname: "media.licdn.com" },
      { hostname: "media-exp1.licdn.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "charming-crown-5c60ef85ae.media.strapiapp.com" },
      { hostname: "eloquent-darling-ddaabdd344.media.strapiapp.com" },
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
