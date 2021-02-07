import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutStep from '../component/CheckoutStep';
import { FormContainer } from '../component/FormContainer';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeholder');
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Способ оплаты</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Выбрать способ оплаты</Form.Label>

        <Col>
          <Form.Check
            type='radio'
            label='PayPal или кредитная карта'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
      </Form.Group>
        <Button type='submit' variant='primary'>
          Продолжить
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
