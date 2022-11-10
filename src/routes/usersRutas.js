const userR = require("express").Router();
const userC = require("../controllers/usersControllers");

userR.get("/", userC.userGet);

userR.post("/", userC.userPost);

userR.put("/:id", userC.userPut);

userR.delete("/:id", userC.userDelete);

module.exports = userR;
