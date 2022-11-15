const { Schema, model, models } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    sizes: {
      type: String,
      enum: {
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        message: '{VALUE} no es un tamaño valido'
      }
    },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} no es un tipo valido'
      }
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un genero válido'
      }
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    tags: [{ type: String }],
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

//model
const Product = /*models.Product || */ new model('Product', productSchema)

module.export = {
  Product
}
