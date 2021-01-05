import React from 'react';
import { Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Raiting from './Raiting';

const Product =(props)=> {
  const { product } = props;
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Raiting
            value={product.rating}
            text={`${product.numReviews} оценок`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
