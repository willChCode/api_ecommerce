const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

const conexionDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("SUCCESFUL CONNECTION TO DATABASE");
  } catch (err) {
    console.log(err);
    console.log("DATABASE CONNECTION ERROR");
  }
};

module.exports = {
  conexionDB,
};
