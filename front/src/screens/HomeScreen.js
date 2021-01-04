import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import products from '../products'

export const HomeScreen=()=> {

    return (
      <div>
        <h3>Last product</h3>
        <Row>
          {products.map((item, index) =>{
            return (
              <Col sm={12} md={6} lg={2}>
                  <Product product={item}/>
              </Col>
            );
          })}
        </Row>
      </div>
    );
}

export default HomeScreen
