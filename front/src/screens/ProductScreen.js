import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {listProductDetails} from '../actions/productActions'
import Loader from '../component/Spinner';
import Message from '../component/Message';

export const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  },[dispatch, match] );


  return (
    <div>
      <Link className='btn btn-dark my-3' to='/'>
        Назад
      </Link>
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message > : (
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
      </Row>)}

    </div>
  );
};
