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

//@desc Register ne User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  console.log('userExist', userExist);

  if (userExist) {
    res.status(400);
    throw new Error('Пользователь уже существует');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
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
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Пользоватеь не найден');
  }
});

//@desc update User profile
//@route PUT /api/users/profie
//@access Private
const updatetUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log('user', req.user.name);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Пользоватеь не найден');
  }
});

//@desc Get Users list
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc delete User
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove()
    res.json({message: 'Пользователь удален'})
  } else {
    res.status(404);
    throw new Error('Пользователь не найден')
  }
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await (await User.findById(req.params.id).select('-password'))
  if (user) {
    res.json(user);
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }

});


//@desc update User
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // console.log('user', req.user.name);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin
    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Пользоватеь не найден');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updatetUserProfile,
  getUsers,
  deleteUser, getUserById, updateUser
};
