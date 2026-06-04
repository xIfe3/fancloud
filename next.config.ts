import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Match the 5 MB cap in saveUpload (+ a small margin for form metadata).
      // Without this, any event-form submission carrying an image > 1 MB is
      // silently rejected by Next.js before our action ever runs.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
