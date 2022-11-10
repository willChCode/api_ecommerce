const loginR = require("express").Router();
const { loginPost } = require("../controllers/loginControllers");

loginR.post("/", loginPost);

module.exports = loginR;
