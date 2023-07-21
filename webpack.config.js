const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... other Webpack configurations ...

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
    }),
    // ... other plugins ...
  ],
};
