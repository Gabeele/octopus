import withPlugins from 'next-compose-plugins';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    }
};

const pwaConfig = {
    pwa: {
        dest: "public",
        register: true,
        disable: process.env.NODE_ENV === "development",
    },
};

export default withPlugins([[withPWA, pwaConfig]], nextConfig);
