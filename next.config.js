/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: require('./next-i18next.config').i18n,
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: { domains: ['placekitten.com'], formats: ['image/avif', 'image/webp'], },
}

module.exports = nextConfig
