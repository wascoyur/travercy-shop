import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../component/Raiting';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductReview,
  listProductDetails,
} from '../actions/productActions';
import Loader from '../component/Spinner';
import Message from '../component/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstans';
import Meta from '../component/Meta';

export const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [raiting, setRaiting] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Отзыв отправлен');
      setRaiting(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        raiting,
        comment,
      })
    );
  };
  return (
    <div>
      <Link className='btn btn-dark my-3' to='/'>
        Назад
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <div>
              <Meta title={product.name}/>
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
                    text={`Обзоров товара от покупателей: ${product.numReviews}`}
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
                          : 'отсутст  вует на складе'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Количество</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock <= 0}
                    >
                      Добавить в корзину
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Отзывы</h2>
              {product.reviews.length === 0 && <Message>Нет отзывов</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroupItem key={review._id}>
                    test
                    <strong>{review.name}</strong>
                    <Rating value={review.raiting} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Оставить отзыв</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId='rating'>
                        Рейтинг
                        <FormControl
                          as='select'
                          value={raiting}
                          onChange={e => {
                            setRaiting(Number(e.target.value));
                          }}
                        >
                          <option value=''>Оцените товар</option>
                          <option value='1'>1-Очень плохо</option>
                          <option value='2'>2-Плохо</option>
                          <option value='3'>3-Хорошо</option>
                          <option value='4'>4-Очень хорошо</option>
                          <option value='5'>5-Рекомендую</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId='comment'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => {
                            setComment(e.target.value);
                          }}
                        ></FormControl>
                      </FormGroup>
                      <Button type='submit' variant='primary'>
                        Оставить отзыв
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Пожалуйста <Link to='/login'>Авторизуйтесь</Link> для
                      написания отзыва
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
