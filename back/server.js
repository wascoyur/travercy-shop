 const express = require('express');
 const products = require('../back/data/backend_products');

 const app =express();

app.listen(5000, console.log('server up'))

 app.get('/', (req, res) =>{
   res.send('API запущен')
 })
 app.get('/api/products', (req, res) =>{
   res.json(products)
 })
 app.get('/products/api/products/:id', (req, res) =>{
   const product = products.find((p) => p._id === req.params.id)
   res.json(product)
 })
