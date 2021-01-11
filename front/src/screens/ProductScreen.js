import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../component/Raiting';
// import products from '../products';

export const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  },[match] );

  // const product = products.find(p => p._id === match.params.id);
  return (
    <div>
      <Link className='btn btn-dark my-3' to='/'>
        Назад
      </Link>
      <Row>
        <Col>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.raiting}
                text={`${product.numReviews} просмотров`}
              />
            </ListGroupItem>
            <ListGroupItem>Описание: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Цена: ${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Наличие:</Col>
                  <Col>
                    {product.countInStock > 0
                      ? `${product.countInStock} шт`
                      : 'отсутвует на складе'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem >
                <Button className='btn-block' type='button' disabled={product.countInStock <= 0}>
                  Добавить в корзину
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
