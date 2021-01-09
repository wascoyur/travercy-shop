import express from'express';
import products from '../back/data/backend_products.js';
import dotenv from'dotenv';

dotenv.config({path:'../back/.env'});
const app = express();

const PORT = process.env.PORT || 5000 ;

app.listen(
  PORT,
  console.log(`server up in mode: ${process.env.NODE_ENV}  port: ${PORT}`)
);

app.get('/', (req, res) => {
  res.send('API запущен');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/products/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});
