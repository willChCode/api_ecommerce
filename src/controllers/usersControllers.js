const { User } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const { registerSchema } = require('../common/users/user_schema');


const userGet = async (req, res) => {

  const id = req.params.id;

  if(!id) return res.status(400).json({ message: 'ID requerido' })

  const user = await User.find(id);

  if(!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.status(200).json(user);
}

const userPost = async (req, res, next) => {
  const { name, age, email, password } = req.body;

  const check = registerSchema.safeParse({ name, age, email, password });
  if(!check.success) return res.status(400).json({ message: check.error.issues[0].message })

  const user = await User.findOne({ email });
  if(user) return res.status(409).json({ message: 'Correo ya en uso' })


  const newUser = new User({
    // nuevo usuario con schema
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

  const check = registerSchema.safeParse({ name, email, password });
  if(!check.success) return res.status(400).json({ message: check.error.issues[0].message })

  const user = await User.findById(id);
  if(!user) return res.status(404).json({ message: 'Usuario no encontrado' })

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

  const user = await User.findById(id);
  if(!user) return res.status(404).json({ message: 'Usuario no encontrado' })

  const eliminar = await User.deleteOne({ _id: id })
  res.status(200).json(eliminar)
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
}
