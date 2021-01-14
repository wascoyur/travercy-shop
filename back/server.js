import express from'express';
import dotenv from'dotenv';
import connectDB from './cofig/db.js'
import colors from 'colors'
import productRoutes from './routes/productRouts.js'
import {notFound, errorHandler} from './errorMiddleware/errorMidlleware.js'

dotenv.config({path:'../back/.env'});

connectDB();
const app = express();

const PORT = process.env.PORT || 5000 ;


// app.use((req, res, next)=>{
//   console.log('hi');
//   next();
// })
app.use('/api/products', productRoutes);

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(`server up in mode: ${process.env.NODE_ENV}  port: ${PORT}`.yellow.bold)
);

app.get('/', (req, res) => {
  res.send('API запущен');
});
