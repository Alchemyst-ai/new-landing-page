// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://getalchemystai.com/', // replace with your site URL
  generateRobotsTxt: true, // Generate a robots.txt file
  sitemapSize: 7000, // Split sitemap if there are too many URLs
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin', '/dashboard/*'], // Exclude certain paths
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin' },
    ],
  },
};
