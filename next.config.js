/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@use "./src/styles/abstracts/_index.scss" as *;`,
  },
}

module.exports = nextConfig
