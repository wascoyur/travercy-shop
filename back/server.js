import express from 'express';
import dotenv from 'dotenv';
import connectDB from './cofig/db.js';
import colors from 'colors';
import productRoutes from './routes/productRouts.js';
import userRoutes from './routes/userRout.js';
import orderRoutes from './routes/orderRouts.js';
import { notFound, errorHandler } from './errorMiddleware/errorMidlleware.js';
import uploadRoutes from './routes/uploadsRoute.js'
import path from 'path'
import morgan from 'morgan'

dotenv.config({ path: '../back/.env' });

connectDB();
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes)
app.use('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')))
  console.log('__dirname,', __dirname);

  app.get('*', (req,res) =>{res.sendFile(path.resolve(__dirname, 'front','build','index.html'))})
} else {
  app.get('/', (req, res) => {
  res.send('API запущен');
});
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server up in mode: ${process.env.NODE_ENV}  port: ${PORT}`.yellow.bold
  )
);
