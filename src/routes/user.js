const {
  createUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.get("/", (req, res) => {
  getUsers(req, res);
});
userRoutes.post("/", (req, res) => {
  createUser(req, res);
});
userRoutes.put("/:id", (req, res) => {
  updateUser(req, res);
});

module.exports = userRoutes;
