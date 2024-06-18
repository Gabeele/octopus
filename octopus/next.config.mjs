
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
});

export default nextConfig;
