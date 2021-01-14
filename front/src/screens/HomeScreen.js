import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import { listProducts } from '../actions/productActions';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <h3>Последние товары</h3>
      {loading ? <h2>Загрузка...</h2> : error ? {error} : (<Row>
        {products.map((item, index) => {
          return (
            <Col key={item._id} sm={12} md={6} lg={2}>
              <Product product={item} />
            </Col>
          );
        })}
      </Row>)}

    </div>
  );
};

export default HomeScreen;
