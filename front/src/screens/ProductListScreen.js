import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../component/Spinner';
import Message from '../component/Message';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

   useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = id => {
    if (window.confirm('Точно удалить?')) {
      //dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (()=>{})

  return (
    <div>
      <Row>
        <Col>
          <h1>Товары</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'> Создать товар</i>
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>НАИМЕНОВАНИЯ</th>
              <th>ЦЕНА</th>
              <th>КАТЕГОРИЯ</th>
              <th>БРЭНД</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  ${product.price}
                </td>
                <td>
                  {product.category}
                </td>
                <td>
                  {product.brand}
                </td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
