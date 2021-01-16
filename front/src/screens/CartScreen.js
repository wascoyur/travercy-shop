import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../component/Message';
import { addToCart } from '../actions/cartActions';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => { };
  const checkoutHandler = id => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Корзина покупателя</h1>
        {cartItems.length === 0 ? (
          <Message varian='info'>
            Ваша корзина пуста <Link to='/'> Вернуться</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map(item => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countinStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>
                Всего товаров{' '}
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{' '}
                штук
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button type='button' className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                >Обработать заказ
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
