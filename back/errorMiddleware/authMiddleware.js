import jwt from 'jsonwebtoken';
import User from '../models//userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token
  console.log('req.he', req.headers.authorization);
  next()
});
export { protect };
