import type { NextConfig } from "next";
import { NOINDEX_ROUTES } from './lib/seo';

const nextConfig: NextConfig = {
  async headers() {
    return NOINDEX_ROUTES.map(source => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }));
  },
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bfcyzdrxnjkfeplcxyxv.supabase.co' },
    ],
  },
};

export default nextConfig;
