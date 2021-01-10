import mongoose from 'mongoose'
import dotenv from 'dotenv';
import  users from './data/users';
import products from './data/backend_products';
import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';
import connectDB from './cofig/db';

dotenv.config();
connectDB();

const exportDataToDb = async()
