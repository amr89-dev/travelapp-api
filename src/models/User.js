const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Reservation = require("./Reservation");
const bcrypt = require("bcrypt");

const User = database.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
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
    role: {
      type: DataTypes.ENUM("admin", "traveler"),
      defaultValue: "traveler",
    },
  },
  {
    timestamps: false,
  }
);
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.hasMany(Reservation, {
  foreignKey: "userId",
  sourceKey: "id",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
module.exports = User;
