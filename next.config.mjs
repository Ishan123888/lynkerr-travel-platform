/** @type {import('next').NextConfig} */
const nextConfig = {
  // මෙතන අර කලින් තිබුණු eslint කෑල්ල සම්පූර්ණයෙන්ම අයින් කරලා තියෙන්නේ
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;