const loginR = require('express').Router()
// const { loginPost } = require('../controllers/loginControllers')
const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

loginR.use(cookieParser())

loginR.get('/', (req, res) => {
  res.cookie('sol', 'sdasasd')
  res.send('login')
})
loginR.post('/', async (req, res) => {
  res.cookie('cookieeeee', 'asdsladkjfalsdkfj')
  const { email, password } = req.body

  const datos = await User.findOne({ email })
  console.log(datos)

  const userValidate =
    datos === null ? false : await bcrypt.compare(password, datos.password)

  if (userValidate === false) {
    return res.status(401).json({ error: 'usuario y password no encontrados' })
  }

  const token = jwt.sign(
    {
      email: datos.email,
      expiresIn: 60 * 60 * 24 * 7
    },
    `${process.env.SECRET}`
  )
  console.log(token)

  res.cookie('auth', 'token')

  // const serialized = cookie.serialize('auth', token, {
  //   httpOnly: true, maxAge: 60 * 60 * 24 * 7, secure: 'strict'
  // })
  // res.setHeaders('Set-Cookie', serialized);

  res.status(200).json({ message: `bienvenido ${datos.name}` })
})

module.exports = loginR
