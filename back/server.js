import express from'express';
import dotenv from'dotenv';
import connectDB from './cofig/db.js'
import colors from 'colors'
import productRoutes from './routes/productRouts.js'

dotenv.config({path:'../back/.env'});

connectDB();
const app = express();

const PORT = process.env.PORT || 5000 ;

app.use('/api/products', productRoutes)

app.listen(
  PORT,
  console.log(`server up in mode: ${process.env.NODE_ENV}  port: ${PORT}`.yellow.bold)
);

app.get('/', (req, res) => {
  res.send('API запущен');
});
