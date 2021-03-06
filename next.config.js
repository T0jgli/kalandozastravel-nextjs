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
});
