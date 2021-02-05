import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormContainer } from '../component/FormContainer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../component/Message';
import Loader from '../component/Spinner';

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin


  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Войти</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
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
            placeholder='Введите действующий пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Войти
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Новый пользователь?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Регистрация
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
