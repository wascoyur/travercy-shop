import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import Message from '../component/Message';
import Loader from '../component/Spinner';
import { listProducts } from '../actions/productActions';

export const HomeScreen = ({match}) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const keyword = match.params.keyword
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <div>
      <h3>Последние товары</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varian='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((item, index) => {
            return (
              <Col key={item._id} sm={12} md={6} lg={2}>
                <Product product={item} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
