require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const database = new Sequelize(
  `postgres://fl0user:8jtRCw5ZaPph@ep-old-cloud-55060796.us-east-2.aws.neon.tech:5432/travelapp?sslmode=require`,
  { logging: false, native: false }
);

module.exports = {
  database,
};
