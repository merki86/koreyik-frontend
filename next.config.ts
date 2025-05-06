import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'desu.shikimori.one',
			},
		],
	},
};

export default nextConfig;
