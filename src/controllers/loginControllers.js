const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { loginSchema } = require('../common/users/user_schema')

const loginPost = async (req, res) => {
  const { email, password } = req.body

  const check = loginSchema.safeParse({ email, password })

  if (!check.success)
    return res.status(401).json({ message: check.error.message })

  const datos = await User.findOne({ email })

  if (!datos || !bcrypt.compareSync(datos.password, password))
    return res.status(401).json({ error: 'email y password no encontrados' })

  const token = jwt.sign(
    {
      email: datos.email,
      expiresIn: 60 * 60 * 24 * 7
    },
    `${process.env.SECRET}`
  )
  // res.setHeader('set-cookie', ['prueba'])
  res
    .status(201)
    .cookie('token', token)
    .json({ message: `bienvenido ${datos.name}` })
}

module.exports = {
  loginPost
}
