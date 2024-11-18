module.exports = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: 'upgrade-insecure-requests',
            },
          ],
        },
      ]
    },
  }