const Dotenv = require('dotenv-webpack');

console.log('Loading environment variables from .env file...');

module.exports = {
  plugins: [
    new Dotenv({
      path: '.env'
    }),
  ],
};
