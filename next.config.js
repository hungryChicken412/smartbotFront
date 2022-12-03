const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboardsss',
        destination: '/dashboards',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
