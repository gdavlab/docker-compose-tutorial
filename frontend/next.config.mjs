/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, context) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }
      return config
    },
    rewrites: async () => {
      return [
        {
          source: "/api/:path*",
          destination: "http://app:8000/api/:path*",
        }
      ]
    }
};

export default nextConfig;
