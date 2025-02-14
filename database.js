require('dotenv').config(); // Load .env variables

module.exports = {
  defaultEnv: "dev",
  dev: {
    driver: "pg",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
};
