/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true, // ✅ 启用 Server Actions
  // },
  eslint: {
    dirs: ["app", "lib", "components", "actions", "provider"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
