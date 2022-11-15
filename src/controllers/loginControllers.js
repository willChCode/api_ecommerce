const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  const datos = await User.findOne({ email });

  const userValidate =
    datos === null ? false : await bcrypt.compare(password, datos.password);

  if (userValidate === false) {
    return res.status(401).json({ error: "usuario y password no encontrados" });
  }

  const token = jwt.sign({ email,  password, expiresIn: 60 * 60 * 24 * 7 }, `${process.env.SECRET}`)

  const serialized = cookie.serialize('auth', token, {
    httpOnly: true, maxAge: 60 * 60 * 24 * 7, secure: 'strict'
  })

  res.setHeaders('Set-Cookie', serialized);
  res.status(200).json({ message: `bienvenido ${datos.name}` });
};

module.exports = {
  loginPost,
};
