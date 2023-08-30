const { DataTypes } = require("sequelize");
const { database } = require("../DB");

const Guest = database.define("guest", {
  idGuest: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("masculine", "feminine", "neuter"),
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Guest;
