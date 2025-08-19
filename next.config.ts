import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },

    // Static export (html)
    output: "export",

    // envs
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
        ENVIRONMENT: process.env.ENVIRONMENT,
    },
};

export default nextConfig;
