const signOutRoutes = require("express").Router();

signOutRoutes.get("/", (req, res) => {
  res.send("Estoy en la ruta de signOutRoutes");
});

module.exports = signOutRoutes;
