const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: Date,
  role: {
    type: String,
    enum: ['admin', 'client', 'SEO'],
    message: `no es un rol valido`,
    default: 'client'
  },
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
})

//configuracion de respuesta
userSchema.set('toJSON', {
  transform: (document, returnDocument) => {
    returnDocument.id = returnDocument._id
    delete returnDocument._id
    delete returnDocument.__v
    delete returnDocument.password
  }
})

//model User
const User = model('User', userSchema)

module.exports = {
  User
}
