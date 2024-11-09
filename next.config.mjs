/** @type {import('next').NextConfig} */
const nextConfig = {
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
