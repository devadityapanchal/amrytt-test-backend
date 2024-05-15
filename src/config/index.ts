import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  API_VERSION,
  LOG_FORMAT,
  LOG_DIR,
  SECRET_KEY,
  SEQUELIZE_DATABASE_URL,
  MONGO_DATABASE_URL,
  JWT_SECRET,
} = process.env;
