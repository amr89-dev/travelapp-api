const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Guest = require("./Guest");

const Reservation = database.define(
  "reservations",
  {
    idReservation: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Reservation.belongsToMany(Guest, { through: "ReservationGuests" });
Guest.belongsToMany(Reservation, { through: "ReservationGuests" });
module.exports = Reservation;
