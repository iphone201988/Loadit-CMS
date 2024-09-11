/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost","loaditbucket.s3.us-east-1.amazonaws.com","34.232.224.68"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: true, // Set to true if this is a permanent redirect
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true, // Set to true if this is a permanent redirect
      },
    ];
  },
};

export default nextConfig;
