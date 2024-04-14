/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gstatic.com",
        // pathname: "/shopping/**",
      },
    ],
  },
};

export default nextConfig;
