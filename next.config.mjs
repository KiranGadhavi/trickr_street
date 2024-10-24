// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC minification if using Babel
  swcMinify: false,

  // Other optional configurations
  reactStrictMode: true, // Enable React strict mode for additional checks
  images: {
    // Example: Add image domains if you're using external images
    domains: ["example.com"],
  },
  // Add other configurations as needed
};

export default nextConfig;
