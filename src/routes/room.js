const {
  createRooms,
  getRooms,
  updateRooms,
  deleteRooms,
} = require("../controllers/roomController");

const roomRoutes = require("express").Router();

roomRoutes.post("/", (req, res) => {
  createRooms(req, res);
});
roomRoutes.get("/", (req, res) => {
  getRooms(req, res);
});
roomRoutes.put("/:id", (req, res) => {
  updateRooms(req, res);
});
roomRoutes.delete("/:id", (req, res) => {
  deleteRooms(req, res);
});

module.exports = roomRoutes;
