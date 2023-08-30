const User = require("../models/User");

const users = [
  {
    email: "admin@mail.com",
    name: "Administrador",
    lastName: "Administrador",
    password: "admin",
    birthdate: "2000-12-31",
    gender: "feminine",
    documentType: "passport",
    documentNumber: "111111111",
    phone: "3011111111",
    role: "admin",
  },
  {
    email: "user@mail.com",
    name: "Usuario",
    lastName: "Viajero",
    password: "user",
    birthdate: "2000-12-31",
    gender: "masculine",
    documentType: "passport",
    documentNumber: "111111111",
    phone: "3011111111",
    role: "traveler",
  },
];

const loadUsers = async () => {
  try {
    const conteoUsuarios = await User.count();
    if (conteoUsuarios <= 0) {
      users.forEach(async (user) => await User.create(user));
      console.log("Usuarios creados");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = loadUsers;
