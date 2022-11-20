const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const { registerSchema } = require('../common/users/user_schema')

const usersGet = async (req, res, next) => {
  try {
    const user = await User.find({}).populate('order', { orderItems: 1 })

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
//arreglado, esta en un get y buscaba el id
const userGetById = async (req, res, next) => {
  try {
    const id = req.params.id

    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
//arregladpo Password2
const userPost = async (req, res, next) => {
  try {
    const datosUser = req.body

    const check = registerSchema.safeParse(datosUser)

    if (!check.success)
      return res.status(400).json({ message: check.error.issues[0].message })

    const newUser = new User({
      // nuevo usuario con schema
      ...datosUser,
      password: bcrypt.hashSync(datosUser.password, 10),
      date: new Date()
    })
    const nuevoUsuario = await newUser.save()

    res.status(201).json({
      message: 'usuario creado',
      nuevoUsuario
    })
  } catch (err) {
    next(err)
  }
}
//arreglado campos desde el req incompletos y desde el check
const userPut = async (req, res, next) => {
  try {
    const id = req.params.id
    const updateUser = req.body

    const check = registerSchema.safeParse(updateUser)

    if (!check.success)
      return res.status(400).json({ message: check.error.issues[0].message })

    const update = await User.updateOne({ _id: id }, updateUser)
    res.status(200).json(update)
  } catch (err) {
    next(err)
  }
}

const userDelete = async (req, res, next) => {
  try {
    const { id } = req.params

    const eliminar = await User.deleteOne({ _id: id })
    res.status(200).json(eliminar)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  usersGet,
  userGetById,
  userPost,
  userPut,
  userDelete
}
