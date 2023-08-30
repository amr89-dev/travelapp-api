const { Sequelize } = require("sequelize");
const Hotel = require("../models/Hotel");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

async function createRooms(req, res) {
  try {
    const {
      idHotel,
      numRooms,
      roomType,
      roomPrice,
      roomTaxes,
      roomLocation,
      available,
    } = req.body;

    const roomTypes = {
      Sencilla: 1,
      Doble: 2,
      Triple: 3,
      Suite: 4,
    };

    const hotel = await Hotel.findByPk(idHotel);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    const percent = Number(roomTaxes) / 100;
    const taxes = Number(roomPrice) * percent;

    const roomsToCreate = [];

    for (let i = 1; i <= numRooms; i++) {
      roomsToCreate.push({
        roomType,
        roomCapacity: roomTypes[roomType],
        roomPrice: Number(roomPrice),
        roomTaxes: Number(roomTaxes),
        netIncome: Number(roomPrice) - taxes,
        roomLocation,
        available,
        hotelId: idHotel,
      });
    }
    const roomsCreated = await Room.bulkCreate(roomsToCreate);
    await hotel.addRooms(roomsCreated);
    await hotel.reload();

    res.status(200).json({ habitacionesCreadas: roomsCreated });
  } catch (error) {
    console.error("Error al crear las habitaciones:", error);
    res.status(200).json({ message: "Error interno del servidor" });
  }
}
async function getRooms(req, res) {
  try {
    const roomsWithReservation = await Room.findAll({
      include: [
        {
          model: Reservation,
        },
      ],
    });

    return res.status(200).json(roomsWithReservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function updateRooms(req, res) {
  try {
    const { roomPrice, roomType, idRoom, available, roomTaxes } = req.body;

    const roomToUpdate = await Room.findByPk(idRoom);

    if (!roomToUpdate) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    const percent = Number(roomTaxes) / 100;
    const taxes = Number(roomPrice) * percent;
    roomToUpdate.roomPrice = roomPrice ?? roomToUpdate.roomPrice;
    roomToUpdate.roomType = roomType ?? roomToUpdate.roomType;
    roomToUpdate.available = available ?? roomToUpdate.available;
    roomToUpdate.roomTaxes = roomTaxes ?? roomToUpdate.roomTaxes;
    roomToUpdate.netIncome = Number(roomPrice) - taxes;

    await roomToUpdate.save();

    res.status(200).json(roomToUpdate);
  } catch (error) {
    console.error("Error al actualizar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
async function deleteRooms(req, res) {
  const { id } = req.params;

  try {
    const roomToDelete = await Room.findByPk(id);

    if (!roomToDelete) {
      return res.status(404).json({ message: "Habitación  no encontrado" });
    }

    await roomToDelete.destroy();
    res.status(204).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
module.exports = { createRooms, getRooms, updateRooms, deleteRooms };
