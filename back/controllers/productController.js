import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProdacts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({products, page, pages: Math.ceil(count/pageSize)});
});

//@desc Fetch all products
//@route GET /api/products/:id
//@access Public
const getProdactById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
  res.json(products);
});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: `Товар ${product.name} удален` });
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
  res.json(product);
});

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
    image: '/images/simple.jpg',
  });
  const createdProducts = await product.save();
  res.json(createdProducts);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    image,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

// @desc create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { raiting, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Продукт уже оценен');
    }
    const review = {
      name: req.user.name,
      raiting: Number(raiting),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.raiting =
      product.reviews.reduce((acc, item) => item.raiting + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Обзор добавлен' });
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

export {
  getProdacts,
  getProdactById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
};
