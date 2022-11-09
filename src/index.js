require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

//config
app.set("nameServer", "SERVER WILL");
app.use(express.json());

//conexion

//middleware
app.use(morgan("dev"));

//rutas
app.get("/", (req, res) => {
  res.send("holas");
});

//puerto
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`${app.get("nameServer")} on port ${port}`);
});
