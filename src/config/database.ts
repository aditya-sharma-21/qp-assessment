import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export { database };
