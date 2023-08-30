require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_URL } = process.env;

const database = new Sequelize(DATABASE_URL, { logging: false, native: false });

module.exports = {
  database,
};
