const { Product } = require('../models/productsModel')

const productGet = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
}

const productPost = async (req, res) => {
  // const {name,price,description,image,stock,sizes,type, gender, slug,tags} = req.body
  const datos = req.body
  const newProduct = new Product({
    name: datos.name,
    price: datos.price,
    description: datos.description,
    stock: datos.stock,
    image: datos.image,
    options: {
      sizes: datos.options.sizes,
      types: datos.options.type,
      genders: datos.options.gender,
      tags: datos.options.tags
    },
    slug: datos.slug
  })
  const data = await newProduct.save()
  res.status(201).json(data)
}

const productDelete = (req, res) => {
  const { id } = req.params

  Product.findByIdAndDelete({ _id: id }).then(data =>
    res.status(200).json(data)
  )
}

module.exports = {
  productGet,
  productPost,
  productDelete
}
