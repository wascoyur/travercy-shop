import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import Message from '../component/Message';
import Loader from '../component/Spinner';
import { listProducts } from '../actions/productActions';
import Paginate from './Paginate';
import ProductCarousel from '../component/ProductCarousel';

export const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const keyword = match.params.keyword;
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <div>
      {!keyword && <ProductCarousel />}
      
      <h3>Последние товары</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varian='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
