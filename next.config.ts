import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "kairetribe.com",
      "www.kairetribe.com",
      "images.unsplash.com",
      ...(supabaseHost ? [supabaseHost] : []),
    ],
  },
};

export default nextConfig;
