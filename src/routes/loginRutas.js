const loginR = require("express").Router();
const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");

loginR.post("/", async (req, res) => {
  const { email, password } = req.body;

  const datos = await User.findOne({ email });

  const userValidate =
    datos === null ? false : await bcrypt.compare(password, datos.password);

  if (userValidate === false) {
    return res.status(401).json({ error: "usuario y password no encontrados" });
  }
  res.status(200).json({ message: `bienvenido ${datos.name}` });
});

module.exports = loginR;
