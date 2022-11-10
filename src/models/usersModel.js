const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: Date,
  rol: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId, //id del ordenes
      ref: "Order",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId, //id del producto
      ref: "Product",
      quantity: null, // cantidad del producto
    },
  ],
});

//configuracion de respuesta
userSchema.set("toJSON", {
  transform: (document, returnDocument) => {
    returnDocument.id = returnDocument._id;
    delete returnDocument._id;
    delete returnDocument.__v;
  },
});

//model User
const User = model("User", userSchema);

module.exports = {
  User,
};
