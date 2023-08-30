const { Op, literal, fn, col } = require("sequelize");
const Hotel = require("../models/Hotel");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

async function getHotels(req, res) {
  try {
    const hotelsWithRooms = await Hotel.findAll({
      include: [
        {
          model: Room,
          as: "rooms",
          include: [
            {
              model: Reservation,
              as: "reservations",
            },
          ],
        },
      ],
    });

    return res.status(200).json(hotelsWithRooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function getHotelDetail(req, res) {
  try {
    const { id } = req.params;
  } catch (error) {}
}
async function createHotel(req, res) {
  try {
    const { name, address, city, country, description } = req.body;
    if (!name || !address || !city || !country) {
      return res.status(401).json({ message: "Faltan datos para le registro" });
    }
    const hotelMatch = await Hotel.findOne({ where: { name, address } });

    if (hotelMatch) {
      return res
        .status(401)
        .json({ message: "Hotel que intentas crear ya existe" });
    }

    const newHotel = await Hotel.create({
      name,
      address,
      city,
      country,
      description,
      image: "https://source.unsplash.com/random/800x600/?hotel",
    });

    return res.status(200).json({
      hotelCreado: newHotel,
    });
  } catch (error) {
    console.error("Error al crear el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function updateHotel(req, res) {
  try {
    const {
      name,
      address,
      city,
      country,
      description,
      favorite,
      idHotel,
      available,
    } = req.body;

    const hotelToUpdate = await Hotel.findByPk(idHotel);

    if (!hotelToUpdate) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    hotelToUpdate.name = name ?? hotelToUpdate.name;
    hotelToUpdate.address = address ?? hotelToUpdate.address;
    hotelToUpdate.city = city ?? hotelToUpdate.city;
    hotelToUpdate.country = country ?? hotelToUpdate.country;
    hotelToUpdate.description = description ?? hotelToUpdate.description;
    hotelToUpdate.favorite = favorite ?? hotelToUpdate.favorite;
    hotelToUpdate.available = available ?? hotelToUpdate.available;

    await hotelToUpdate.save();

    res.status(200).json(hotelToUpdate);
  } catch (error) {
    console.error("Error al actualizar el hotel:", error);
    res.status(500).json({ message: "Error al actualizar el hotel" });
  }
}

async function deleteHotel(req, res) {
  const { id } = req.params;

  try {
    const hotelToDelete = await Hotel.findByPk(id);

    if (!hotelToDelete) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    await hotelToDelete.destroy();
    res.status(204).json({ message: "Hotel eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
async function getHotelsByParameters(req, res) {
  try {
    const { city, checkInDate, checkOutDate, numberOfGuests = 1 } = req.body;

    if (!checkInDate || !checkOutDate) {
      return res.status(401).json({ message: "Las fechas son requeridas" });
    }

    let roomsInCityWithTotalCapacity = [];
    if (city) {
      roomsInCityWithTotalCapacity = await Room.findAll({
        attributes: [[fn("SUM", col("roomCapacity")), "totalCapacity"]],
        include: {
          model: Hotel,
          as: "hotel",
          where: {
            city: { [Op.iLike]: city },
          },
        },
        group: ["hotel.idHotel"],
      });
    } else {
      roomsInCityWithTotalCapacity = await Room.findAll({
        attributes: [[fn("SUM", col("roomCapacity")), "totalCapacity"]],
        include: {
          model: Hotel,
          as: "hotel",
        },
        group: ["hotel.idHotel"],
      });
    }

    const hotelsWithEnoughCapacity = roomsInCityWithTotalCapacity
      .filter((hotel) => hotel.dataValues.totalCapacity >= numberOfGuests)
      .map((hotel) => hotel.hotel.idHotel);
    if (hotelsWithEnoughCapacity.length <= 0) {
      return res
        .status(401)
        .json({ message: "No hay hoteles con suficiente capacidad" });
    }

    const conflictingReservations = await Reservation.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { checkOutDate: { [Op.gt]: new Date(checkInDate) } },
              { checkOutDate: { [Op.lt]: new Date(checkOutDate) } },
            ],
          },
          {
            [Op.and]: [
              { checkInDate: { [Op.lt]: new Date(checkOutDate) } },
              { checkInDate: { [Op.gt]: new Date(checkInDate) } },
            ],
          },
          {
            [Op.and]: [
              { checkInDate: { [Op.lte]: new Date(checkInDate) } },
              { checkOutDate: { [Op.gte]: new Date(checkOutDate) } },
            ],
          },
        ],
      },
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
      ],
    });

    const roomIdsToExclude = conflictingReservations.map((el) => el.roomId);

    let hotelsWithAvailableRooms = [];
    if (city) {
      hotelsWithAvailableRooms = await Hotel.findAll({
        include: [
          {
            model: Room,
            as: "rooms",
            where: {
              idRoom: {
                [Op.and]: [
                  { [Op.notIn]: roomIdsToExclude },
                  { [Op.not]: null },
                ],
              },
            },
            required: true,
          },
        ],
        where: {
          city: { [Op.iLike]: city },
          idHotel: { [Op.in]: hotelsWithEnoughCapacity },
        },
      });
    } else {
      hotelsWithAvailableRooms = await Hotel.findAll({
        include: [
          {
            model: Room,
            as: "rooms",
            where: {
              idRoom: {
                [Op.and]: [
                  { [Op.notIn]: roomIdsToExclude },

                  { [Op.not]: null },
                ],
              },
            },
            required: true,
          },
        ],
        where: {
          idHotel: { [Op.in]: hotelsWithEnoughCapacity },
        },
      });
    }

    res.status(200).json(hotelsWithAvailableRooms);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotelDetail,
  getHotelsByParameters,
};
