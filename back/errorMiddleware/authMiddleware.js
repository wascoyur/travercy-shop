import jwt from 'jsonwebtoken';
import User from '../models//userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user =await User.findById(decoded.id).select('-password');

      // console.log('token найден:', decoded, 'user authMidl:', req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Не авторизован, ошибка токена');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Не авторизован, токен не найден ');
  }
});

export { protect };