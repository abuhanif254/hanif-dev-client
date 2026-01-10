/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'saheragroup.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dhakapost.com',
            },
            {
                protocol: 'https',
                hostname: 'utilitykit.online',
            }
        ],
    },
    reactStrictMode: true,
}

export default nextConfig
