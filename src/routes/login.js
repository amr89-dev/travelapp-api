const { login } = require("../controllers/loginController");

const loginRoutes = require("express").Router();

loginRoutes.post("/", (req, res) => {
  login(req, res);
});

module.exports = loginRoutes;
