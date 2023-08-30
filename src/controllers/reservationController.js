const { Sequelize } = require("sequelize");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const Guest = require("../models/Guest");
const Hotel = require("../models/Hotel");
const User = require("../models/User");
const transporter = require("../helper/mailer");
require("dotenv").config();

const { NODEMAILER_EMAIL } = process.env;

async function getReservations(req, res) {
  try {
    const reservation = await Reservation.findAll({
      include: [
        {
          model: Room,
          as: "room",
          include: [
            {
              model: Hotel,
              as: "hotel",
            },
          ],
        },
        {
          model: Guest,
        },
      ],
    });

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
  }
}
async function createReservation(req, res) {
  try {
    const {
      idRoom,
      checkInDate,
      checkOutDate,
      userId,
      emergencyContactName,
      emergencyContactPhone,
      guests,
    } = req.body;

    if (!idRoom || !checkInDate || !checkOutDate) {
      res.status(401).json({ error: "Faltan datos para la reserva" });
    }
    const room = await Room.findByPk(idRoom);

    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    const existingReservation = await Reservation.findOne({
      where: {
        roomId: idRoom,
        [Sequelize.Op.or]: [
          {
            checkInDate: {
              [Sequelize.Op.lte]: new Date(checkOutDate),
            },
            checkOutDate: {
              [Sequelize.Op.gte]: new Date(checkInDate),
            },
          },
        ],
      },
    });

    if (existingReservation) {
      return res
        .status(409)
        .json({ message: "La habitación no está disponible en esas fechas" });
    }
    const newReservation = await Reservation.create({
      roomId: idRoom,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      userId,
      emergencyContactName,
      emergencyContactPhone,
    });
    if (guests && guests.length > 0) {
      const newGuests = await Guest.bulkCreate(guests);
      await newReservation.addGuests(newGuests);
    }

    const user = await User.findByPk(userId);
    const dataReservation = await Reservation.findByPk(
      newReservation.idReservation,
      {
        include: [
          {
            model: Room,
            include: Hotel,
          },
        ],
      }
    );

    const sendResult = await transporter.sendMail({
      from: `TravelApp ${NODEMAILER_EMAIL}`,
      to: user.email,
      subject: "Has creado la reserva exitosamente",
      html: `<body>
  <h1>Detalle de Reserva</h1>
  <h2>Reserva</h2>
  <p><strong>ID de Reserva:</strong>${newReservation.idReservation}</p>
  <p><strong>Fecha de Check-In:</strong>${checkInDate} </p>
  <p><strong>Fecha de Check-Out:</strong> ${checkOutDate}</p>
  <p><strong>Contacto de Emergencia:</strong> ${emergencyContactName}</p>
  <p><strong>Teléfono de Emergencia:</strong> ${emergencyContactPhone}</p>

  <h2>Habitación</h2>
  <p><strong>Tipo de Habitación:</strong> ${
    dataReservation.dataValues.room.roomType
  }</p>
  <p><strong>Capacidad de Habitación:</strong> ${
    dataReservation.dataValues.room.roomCapacity
  }</p>
  <p><strong>Precio de Habitación:</strong> $${
    dataReservation.dataValues.room.roomPrice
  }</p>
  <p><strong>Ubicación de Habitación:</strong> ${
    dataReservation.dataValues.room.roomLocation
  }</p>

  <h2>Hotel</h2>
  <p><strong>Nombre de Hotel:</strong> ${
    dataReservation.dataValues.room.hotel.name
  }</p>
  <p><strong>Dirección de Hotel:</strong> ${`${dataReservation.dataValues.room.hotel.address}, ${dataReservation.dataValues.room.hotel.city}, ${dataReservation.dataValues.room.hotel.country}`}</p>
</body>`,
    });

    res.status(200).json({ reservation: dataReservation });
  } catch (error) {
    console.log(error);
  }
}

async function updateReservation(req, res) {
  try {
    const { checkInDate, checkOutDate, idReservation } = req.body;

    const reservationToUpdate = await Reservation.findByPk(idReservation);

    if (!reservationToUpdate) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reservationToUpdate.checkInDate = checkInDate;
    reservationToUpdate.checkOutDate = checkOutDate;

    await reservationToUpdate.save();

    res.status(200).json(reservationToUpdate);
  } catch (error) {
    console.error("Error al actualizar la reserva", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteReservation(req, res) {
  const { id } = req.params;

  try {
    const reservationToDelete = await Reservation.findByPk(id);

    if (!reservationToDelete) {
      return res.status(404).json({ message: "Reserva no encontrado" });
    }

    await reservationToDelete.destroy();
    res.status(204).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
