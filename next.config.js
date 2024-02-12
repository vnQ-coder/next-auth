// @ts-check

const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/:slug",
        destination: "/:slug/login",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `"${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com"`,
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: `"${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com"`,
        pathname: "**",
      },
    ],
  },
};

module.exports = withNextIntl(config);
