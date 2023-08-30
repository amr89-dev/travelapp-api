const { DataTypes } = require("sequelize");
const { database } = require("../DB");

const Token = database.define(
  "token",
  {
    idToken: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Token;
