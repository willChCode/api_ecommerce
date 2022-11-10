const { User } = require("../models/usersModel");
const { Rol } = require("../models/rolesModel");

//falta arreglar añade usuarios sin completar bien la id
const adminPost = async (req, res) => {
  const { name, lastName, age, email, password, rolId } = req.body;

  const rol = await Rol.findById(rolId); //buscamos el id del rol

  const newUser = new User({
    name,
    lastName,
    age,
    email,
    password,
    date: new Date(),
    rol,
  });

  const nuevoUsuario = await newUser.save();
  //concatenamos y guardamos el nuevo usuario en el rol
  rol.user = rol.user.concat(nuevoUsuario._id);
  await rol.save();

  res.status(201).json(nuevoUsuario);
};

module.exports = {
  adminPost,
};
