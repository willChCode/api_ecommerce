const rolesR = require("express").Router();
const { Rol } = require("../models/rolesModel");

rolesR.get("/", async (req, res) => {
  const buscar = await Rol.find({});
  res.status(200).json(buscar);
});
rolesR.post("/", async (req, res) => {
  const { cargo } = req.body; //body

  const newRol = new Rol({
    cargo: cargo,
  });
  const agregar = await newRol.save();
  res.status(201).json(agregar);
});
// rolesR.put("/:id", (req, res) => {
//   res.send("put");
// });
rolesR.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const eliminar = await Rol.deleteOne({ _id: id });
    res.status(200).json(eliminar);
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "id usuario no encontrado" });
  }
});

module.exports = rolesR;
