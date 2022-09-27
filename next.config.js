/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  //basePath: '/docs', // To deploy a Next.js application under a sub-path of a domain
  poweredByHeader: false, // By default Next.js will add the x-powered-by header
  images: { // used to provide a list of allowed hostnames for external images.
    domains: ['media.graphassets.com'],
  },
}

module.exports = nextConfig
