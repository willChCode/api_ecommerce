require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { conexionDB } = require("./mongo");
const notFound = require("./middleware/notFound");
const rolesR = require("./routes/rolesRutas");
const userR = require("./routes/usersRutas");
const adminR = require("./routes/adminRutas");
const app = express();

//config
app.set("nameServer", "SERVER WILL");
app.use(express.json());

//conexion
conexionDB();

//middleware
app.use(morgan("dev"));

//rutas
app.get("/", (req, res) => {
  res.send("holas");
});
app.use("/api/roles", rolesR);
app.use("/api/admin", adminR);
app.use("/api/users", userR);

//middlewares
app.use(notFound);

//puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`${app.get("nameServer")} on port ${port}`);
});
