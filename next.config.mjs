/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false
            }
        }
        return config;
    }
};

export default nextConfig;
