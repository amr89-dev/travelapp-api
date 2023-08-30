const routes = require("express").Router();

routes.use("/login", require("./login"));
routes.use("/user", require("./user"));
routes.use("/room", require("./room"));
routes.use("/hotel", require("./hotel"));
routes.use("/reservation", require("./reservation"));

module.exports = routes;
