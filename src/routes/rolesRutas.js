const rolesR = require("express").Router();
const { Rol } = require("../models/rolesModel");
const rolC = require("../controllers/rolesControllers"); //refactorizamos con nombre de objeto

rolesR.get("/", rolC.rolGet);

rolesR.post("/", rolC.rolPost);

rolesR.delete("/:id", rolC.rolDelete);

module.exports = rolesR;
