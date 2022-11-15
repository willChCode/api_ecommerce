
const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser');


const loginPost = async (req, res) => {
  const { email, password } = req.body

  const datos = await User.findOne({ email })
  console.log(datos)

  const userValidate =
    datos === null ? false : await bcrypt.compare(password, datos.password)

  if (userValidate === false) {
    return res.status(401).json({ error: 'usuario y password no encontrados' })
  }


  const token = jwt.sign({ email,  password, expiresIn: 60 * 60 * 24 * 7 }, `${process.env.SECRET}`)

  res.cookie('auth', `${token}`);

  // const serialized = cookie.serialize('auth', token, {
  //   httpOnly: true, maxAge: 60 * 60 * 24 * 7, secure: 'strict'
  // })
  // res.setHeaders('Set-Cookie', serialized);
  
  res.status(200).json({ message: `bienvenido ${datos.name}` });
};

module.exports = {
  loginPost
}
