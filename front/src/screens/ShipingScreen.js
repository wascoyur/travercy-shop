import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutStep from '../component/CheckoutStep';
import { FormContainer } from '../component/FormContainer';

const ShipingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2/>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            type='address'
            placeholder='Введите адрес'
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>Город</Form.Label>
          <Form.Control
            type='city'
            placeholder='Введите город'
            value={city}
            required
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Индекс</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Введите индекс места назначения'
            value={postalCode}
            required
            onChange={e => setCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Страна</Form.Label>
          <Form.Control
            type='country'
            placeholder='Введите страну назначения'
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Продолжить
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShipingScreen;
