/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/app',
    sw: 'service-worker.js',

});

export default nextConfig;
