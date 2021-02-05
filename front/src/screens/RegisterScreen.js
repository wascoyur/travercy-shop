import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormContainer } from '../component/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../component/Message';
import Loader from '../component/Spinner';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
       setMessage('Пароли не совпадают')
    } else {
       dispatch(register(name, email, password))
     }
  };

  return (
    <FormContainer>
      <h1>Регистрация</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type='name'
            placeholder='Введите свое имя'
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type='email'
            placeholder='Введите свою почту'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите желаемый пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Подтвердить пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Подтвердите желаемый пароль'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Регистрация
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Уже есть учетная запись?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Вход
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
