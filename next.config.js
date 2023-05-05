/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: { domains: ['placekitten.com'], formats: ['image/avif', 'image/webp'], },
}

module.exports = nextConfig
