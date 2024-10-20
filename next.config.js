/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  ...nextConfig,
  important: true,
  i18n: {
    // providing the locales supported by your application
    locales: ['en', 'hi', 'ar'],
    //  default locale used when the non-locale paths are visited
    defaultLocale: 'en',
  },
  images: {
    domains: ['res.cloudinary.com', 'demo.myfatoorah.com'],
  },
}
