import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

//@desc Auth user & get token
//@route GET /api/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Неверный логин или пароль');
  }
});

//@desc Get User profile
//@route GET /api/profie
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);
  // console.log('user', req.user.name);

  if (user) {
    res.json({
      _id: user._id,
      name: user.email,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

export { authUser, getUserProfile };
