const Dotenv = require('dotenv-webpack');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    ...(!isProd ? [new Dotenv({ path: './.env' })] : []),
    ...(isProd ? [new Dotenv({ systemvars: true })] : []),
  ],
};
