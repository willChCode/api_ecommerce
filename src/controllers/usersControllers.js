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

  const passwordHash = await bcrypt.hash(password, 10) //encriptando la contra

  const rol = await Rol.findById(rolId) //buscamos el id del rol

  const newUser = new User({
    //nuevo usuario con schema
    name,
    age,
    email,
    password: passwordHash,
    date: new Date(),
    rol
  })

  const nuevoUsuario = await newUser.save()
  //concatenamos y guardamos el nuevo usuario en el rol
  // rol.user = rol.user.concat(nuevoUsuario._id);
  // await rol.save();

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
