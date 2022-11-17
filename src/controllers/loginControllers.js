const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginPost = async (req, res) => {
  const { email, password } = req.body

  const datos = await User.findOne({ email })

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
  // res.cookie('tokens', token, {
  //   secure: true,
  //   maxAge: 60 * 60 * 24 * 7
  // })

  // res.setHeader('set-cookie', ['prueba'])
  res.status(200).json({ message: `bienvenido ${datos.name}`, token })
}

module.exports = {
  loginPost
}
