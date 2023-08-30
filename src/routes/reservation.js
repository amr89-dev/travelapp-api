const {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

const reservationRoutes = require("express").Router();

reservationRoutes.post("/", (req, res) => {
  createReservation(req, res);
});
reservationRoutes.get("/", (req, res) => {
  getReservations(req, res);
});
reservationRoutes.put("/", (req, res) => {
  updateReservation(req, res);
});
reservationRoutes.delete("/:id", (req, res) => {
  deleteReservation(req, res);
});

module.exports = reservationRoutes;
