import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://vibetel.com.co',
  generateRobotsTxt: true,
};

export default config;
