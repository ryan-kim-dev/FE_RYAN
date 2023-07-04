/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: { domains: ['www.notion.so'] },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
