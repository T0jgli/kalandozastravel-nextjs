const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    poweredByHeader: false,
    experimental: {
        scrollRestoration: true,
    },
    async headers() {
        return [
            {
                // Sets security headers for all routes
                source: "/(.*)",
                headers: [
                    {
                        key: "Referrer-Policy",
                        value: "no-referrer, strict-origin-when-cross-origin",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "nosniff",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()",
                    },
                ],
            },
        ];
    },
});
