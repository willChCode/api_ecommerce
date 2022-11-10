const userR = require("express").Router();
const { User } = require("../models/usersModel");
const { Rol } = require("../models/rolesModel");

userR.get("/", async (req, res) => {
  const buscar = await User.find({}).populate("rol", { cargo: 1 });
  res.status(200).json(buscar);
});

userR.post("/", async (req, res) => {
  const {
    // request body
    name,
    lastName,
    age,
    email,
    password,
    rolId = "636c147d7f1c733c080210d0", //siempre va ser cliente
  } = req.body;

  const rol = await Rol.findById(rolId); //buscamos el id del rol

  const newUser = new User({
    //nuevo usuario con schema
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
});

userR.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const userPut = {
    name,
    email,
    password,
  };
  const update = await User.updateOne({ _id: id }, userPut);
  res.status(200).json(update);
});

userR.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const eliminar = await User.deleteOne({ _id: id });
  res.status(200).json(eliminar);
});

module.exports = userR;
