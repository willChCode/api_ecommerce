const { Rol } = require("../models/rolesModel");

const rolGet = async (req, res) => {
  const buscar = await Rol.find({}).populate("user", { name: 1, email: 1 });
  res.status(200).json(buscar);
};

const rolPost = async (req, res) => {
  const { cargo } = req.body; //body

  const newRol = new Rol({
    cargo: cargo,
  });
  const agregar = await newRol.save();
  res.status(201).json(agregar);
};

const rolDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const eliminar = await Rol.deleteOne({ _id: id });
    res.status(200).json(eliminar);
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "id usuario no encontrado" });
  }
};

module.exports = {
  rolGet,
  rolPost,
  rolDelete,
};
