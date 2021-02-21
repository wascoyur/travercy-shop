import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FormContainer } from "../component/FormContainer";
import Message from "../component/Message";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../component/Spinner";
import { getUserDetails } from "../actions/userActions";


const UserListScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  , [user, dispatch, userId]);

  const submitHandler = e => {
    e.preventDefault();

  };

  return (
    <div>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Вернуться
      </Link>
      <FormContainer>
        <h1>Редактировать данные пользователя</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type='name'
                placeholder='Введите имя'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control
                type='email'
                placeholder='Введите почту'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Label>Установать полномочия администратора</Form.Label>
              <Form.Check
                type='checkbox'
                label='Администратор'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Обновить данные
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserListScreen;
