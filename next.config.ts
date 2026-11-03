import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Permit development assets on the same local addresses used for previews.
  allowedDevOrigins: ['127.0.0.1', '10.49.56.116', '192.168.1.7'],
};
export default nextConfig;
