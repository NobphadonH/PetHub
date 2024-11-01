import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

export const dbConfig = {
  host: process.env.RDS_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};