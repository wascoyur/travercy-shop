import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@examlple.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Иван Иванов',
    email: 'ivan@examlple.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Марья Петровнв',
    email: 'marin@examlple.com',
    password: bcrypt.hashSync('123456', 10),
  },
];
export default users 
