/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "content2.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "akam.cdn.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/products/:slug", destination: "/product/:slug", permanent: true },
      { source: "/furniture", destination: "/shop", permanent: true },
      { source: "/offers", destination: "/shop", permanent: true },
      { source: "/custom-design", destination: "/contact", permanent: true },
      { source: "/branches", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
