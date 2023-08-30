const bcrypt = require("bcrypt");
const User = require("../models/User"); // Asegúrate de importar el modelo de usuario
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/generateToken");
const Token = require("../models/Token");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos algunos datos" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    //autenticar ususario
    const userDetails = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const createAccesToken = () => {
      return generateAccessToken(userDetails);
    };
    const createRefreshToken = async () => {
      const refreshToken = generateRefreshToken(userDetails);
      try {
        await Token.create({ token: refreshToken });
      } catch (error) {
        console.log("Error al crear el token en la base de datos", error);
      }
      return refreshToken;
    };
    const accessToken = createAccesToken();
    const refreshToken = await createRefreshToken();

    res.status(200).json({ accessToken, refreshToken, userDetails });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
module.exports = { login };
