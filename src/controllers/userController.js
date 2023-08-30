const User = require("../models/User");
const { Sequelize } = require("sequelize");

async function getUsers(req, res) {
  try {
    const allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
  }
}
async function createUser(req, res) {
  try {
    const {
      name,
      lastName,
      email,
      password,
      birthdate,
      gender,
      documentType,
      documentNumber,
      phone,
      role,
    } = req.body;

    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !birthdate ||
      !gender ||
      !documentType ||
      !documentNumber ||
      !phone
    ) {
      return res.status(400).json({ message: "Faltan datos algunos datos" });
    }
    const usernameMatch = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ documentNumber, email }],
      },
    });

    if (usernameMatch) {
      return res.status(400).json({ message: "El usuario ya esta registrado" });
    }
    let newUser = await User.create({
      name,
      lastName,
      email,
      password,
      birthdate,
      gender,
      documentType,
      documentNumber,
      phone,
      role,
    });

    res.status(200).json({
      userCreated: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { password, role } = req.body;

    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuario no encontrada" });
    }

    userToUpdate.password = password ?? userToUpdate.password;
    userToUpdate.role = role ?? userToUpdate.password;

    await userToUpdate.save();

    res.status(200).json(userToUpdate);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, getUsers, updateUser };
