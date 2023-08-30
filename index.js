require("dotenv").config();
const server = require("./src/app.js");
const { database } = require("./src/DB.js");
const loadHotels = require("./src/helper/hotelDB.js");
const loadUsers = require("./src/helper/userDB.js");

const PORT = process.env.PORT || 3001;

const main = async () => {
  try {
    await database.authenticate();
    await database.sync({ force: false });
    console.log("La conexion a la base de datos es exitosa");

    server.listen(PORT, (req, res) => {
      console.log(`server raised in port ${PORT}`);
    });
    await loadHotels();
    await loadUsers();
  } catch (error) {
    console.log("-->", error);
  }
};
main();
