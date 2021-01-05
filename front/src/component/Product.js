import React from 'react';
import { Card } from 'react-bootstrap';
import Raiting from './Raiting';

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'></Card.Img>
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Raiting
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
