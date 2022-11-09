const { Schema, model } = require("mongoose");

const rolSchema = new Schema({
  cargo: {
    type: String,
    required: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
//configuracion de respuesta
rolSchema.set("toJSON", {
  transform: (document, returnDocument) => {
    returnDocument.id = returnDocument._id;
    delete returnDocument._id;
    delete returnDocument.__v;
  },
});

//creacion del query para Rol
const Rol = model("Rol", rolSchema);

module.exports = {
  Rol,
};
