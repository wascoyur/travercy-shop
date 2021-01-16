import mongoose from 'mongoose'
import products from '../back/data/backend_products.js';
import dotenv from 'dotenv';
import connectDB from './cofig/db.js';
import colors from 'colors';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js'
import users from './data/users.js'

dotenv.config({ path: '../back/.env' });

connectDB();

const exportDataToDb = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProduct = products.map(product =>{
      return{...product, user: adminUser}
    })
    await Product.insertMany(sampleProduct)
    console.log('Data exported to cloud DB.');
    process.exit()

  } catch (error) {
    console.log(`Error is: ${error}`);
    process.exit(1);
  }
};
const destroyDataOnDb = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Deleted on cloud DB.');
    process.exit()
  } catch (error) {
    console.log(`Error is: ${error}`);
    process.exit(1);
  }
}
if(process.argv[2] === '-d'){
  destroyDataOnDb()
} else {
exportDataToDb()
}
