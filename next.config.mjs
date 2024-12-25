/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {

                hostname: '**',
                pathname: '**',

            },
        ],
    },
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: '/:path*',
            },
        ];
    },
};


export default nextConfig;
