const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Room = require("./Room");

const Hotel = database.define(
  "hotels",
  {
    idHotel: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Hotel.hasMany(Room, {
  foreignKey: "hotelId",
  sourceKey: "idHotel",
});

Room.belongsTo(Hotel, {
  foreignKey: "hotelId",
  targetKey: "idHotel",
});
module.exports = Hotel;
