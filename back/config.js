const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    throw result.error;
  }
  const { parsed: envs } = result;
module.exports = {
    endpoint: envs.DATABASE_URL,
    port: envs.PORT,
    email: envs.EMAIL_USERNAME,
    password: envs.EMAIL_PASSWORD
  };
