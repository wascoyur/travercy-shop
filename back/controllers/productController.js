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
export {getProdacts, getProdactById}
