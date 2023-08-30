const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Hotel = require("./Hotel");
const Reservation = require("./Reservation");

const Room = database.define(
  "rooms",
  {
    idRoom: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    roomType: {
      type: DataTypes.STRING,
      defaultValue: "sencilla",
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    roomPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    roomTaxes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    netIncome: {
      type: DataTypes.INTEGER,
    },
    roomLocation: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

Room.hasMany(Reservation, {
  foreignKey: "roomId",
  sourceKey: "idRoom",
});

Reservation.belongsTo(Room, {
  foreignKey: "roomId",
  targetKey: "idRoom",
});

module.exports = Room;
