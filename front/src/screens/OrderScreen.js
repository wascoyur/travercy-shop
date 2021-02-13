import React, { useEffect } from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../component/Spinner';
import Message from '../component/Message';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector(state => state.orderDetails);
  console.log('');

  const { order, loading, error } = orderDetails;

  try {
    order.itemsPrice = order.orderItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    order.shippingPrice = order.itemsPrice > 100 ? 0 : 100;
    order.totalPrice = +(
      Number(order.itemsPrice) + Number(order.shippingPrice)
    ).toFixed(2);
  } catch (e) {
    <Message variant='danger'>{e}</Message>;
  }

  //

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Чек {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Доставка</h2>

              <strong>Пользователь: </strong>
              <p>{order.user.name}</p>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Адрес:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
                  </p>
                  <p>
                    {order.isDelivered ? (<Message variant='success'>Доставлено в {order.deliveres.At}</Message>):(<Message variant='danger'>Не доставлено</Message>)}
                  </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Способ оплаты</h2>
              <p>
                <strong>Метод: </strong>
              </p>
              {order.isPaid ? (
                <Message variant='danger'>Не оплачено</Message>
              ) : (
                <Message variant='danger'>Не оплачено</Message>
              )}
              {order.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Покупки</h2>
              {order.orderItems.length === 0 ? (
                <Message>Ваш чек пуст</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>К оплате</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Покупки</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Доставка</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Суммарно</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
