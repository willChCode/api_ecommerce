const { User } = require('../models/usersModel')
// const { Rol } = require('../models/rolesModel')
const bcrypt = require('bcrypt')

const userGet = async (req, res) => {
  const buscar = await User.find({})
  res.status(200).json(buscar)
}

const userPost = async (req, res) => {
  const {
    // request body
    name,
    age,
    email,
    password
  } = req.body

  const newUser = new User({
    //nuevo usuario con schema
    name,
    age,
    email,
    password: bcrypt.hashSync(password, 10),
    date: new Date()
  })

  const nuevoUsuario = await newUser.save({ validateBeforeSave: true })
  res.status(201).json(nuevoUsuario)
}

const userPut = async (req, res) => {
  const id = req.params.id
  const { name, email, password } = req.body

  const userPut = {
    name,
    email,
    password
  }
  const update = await User.updateOne({ _id: id }, userPut)
  res.status(200).json(update)
}

const userDelete = async (req, res) => {
  const { id } = req.params

  const eliminar = await User.deleteOne({ _id: id })
  res.status(200).json(eliminar)
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
}
