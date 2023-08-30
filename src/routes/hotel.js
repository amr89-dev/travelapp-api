const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotelsByParameters,
} = require("../controllers/hotelController");

const hotelRoutes = require("express").Router();

hotelRoutes.get("/", (req, res) => {
  getHotels(req, res);
});
hotelRoutes.post("/", (req, res) => {
  createHotel(req, res);
});
hotelRoutes.post("/search", (req, res) => {
  getHotelsByParameters(req, res);
});

hotelRoutes.put("/", (req, res) => {
  updateHotel(req, res);
});
hotelRoutes.delete("/", (req, res) => {
  deleteHotel(req, res);
});

module.exports = hotelRoutes;
