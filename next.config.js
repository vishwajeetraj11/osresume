const path = require('path');

module.exports = {
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  turbopack: {
    root: __dirname,
  },
};
