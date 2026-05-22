/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://onpointinstallations.com',
  generateRobotsTxt: true,
  trailingSlash: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/studio/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/studio/'] },
    ],
  },
};
