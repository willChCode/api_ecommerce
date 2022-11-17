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
    image: {
      type: String
    },
    options: {
      sizes: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        default: 'L'
      },
      types: {
        type: String,
        enum: ['shirts', 'pants', 'hoodies', 'hats']
      },
      genders: {
        type: String,
        enum: ['men', 'women', 'kid', 'unisex']
      },
      tags: [{ type: String }]
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

//model
const Product = models.Product || new model('Product', productSchema)

module.exports = {
  Product
}
