const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const server = express();

server.use(express.json());
const ACCEPTED_ORIGINS = ["http://localhost:3001", "*"];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
server.use(cors(corsOptions));

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
