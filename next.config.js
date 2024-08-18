const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const obfuscatorOptions = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    disableConsoleOutput: false,
    domainLock: [".usamyon.moe", "localhost"],
    domainLockRedirectUrl: "about:blank",
    identifierNamesCache: null,
    identifierNamesGenerator: "mangled",
    optionsPreset: "low-obfuscation",
    rotateStringArray: true,
    seed: 0,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayIndexesType: ["hexadecimal-number"],
    target: "browser",
    sourceMap: true,
};

// const withNextJsObfuscator = require("nextjs-obfuscator")(obfuscatorOptions);

// module.exports = withNextJsObfuscator(
module.exports = withBundleAnalyzer({
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    poweredByHeader: false,
    experimental: {
        scrollRestoration: true,
    },
    // assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined,
    // async headers() {
    //     return [
    //         {
    //             // Sets security headers for all routes
    //             source: "/(.*)",
    //             headers: [
    //                 {
    //                     key: "Referrer-Policy",
    //                     value: "no-referrer, strict-origin-when-cross-origin",
    //                 },
    //                 {
    //                     key: "Strict-Transport-Security",
    //                     value: "max-age=63072000; includeSubDomains",
    //                 },
    //                 {
    //                     key: "X-Content-Type-Options",
    //                     value: "nosniff",
    //                 },
    //                 {
    //                     key: "X-Frame-Options",
    //                     value: "DENY",
    //                 },
    //                 {
    //                     key: "X-XSS-Protection",
    //                     value: "nosniff",
    //                 },
    //                 {
    //                     key: "Permissions-Policy",
    //                     value: "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()",
    //                 },
    //             ],
    //         },
    //     ];
    // },
});
// );
