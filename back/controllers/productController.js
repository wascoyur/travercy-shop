import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProdacts = asyncHandler(async(req, res) =>{
    const products = await Product.find({

    })
    res.json(products)
  }
)

//@desc Fetch all products
//@route GET /api/products/:id
//@access Public
const getProdactById = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Товар не найден');
    }
    res.json(products)
  }
)

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);

  if (product) {

      await product.remove()
      res.json( {message: `Товар ${product.name} удален`});
    } else {
      res.status(404);
      throw new Error('Товар не найден');
    }
    res.json(product)
  }
)


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Name',
    price: 0,
    user: req.user._id,
    brand: 'Brand',
    category: 'Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Description',
    image: '/images/simple.jpg'
  })
  const createdProducts = await product.save()
  res.json(createdProducts)

})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, image} = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.image = image

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Товар не найден')
  }



})
export { getProdacts, getProdactById, deleteProduct, updateProduct, createProduct };
