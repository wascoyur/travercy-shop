import React, {useEffect, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import axios from 'axios'

export const HomeScreen=()=> {

    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
      const fetchProducts = async ()=>{
        const {data} = await axios.get('api/products')
        setProducts(data)
      }
      fetchProducts();
    },[])

    return (
      <div>
        <h3>Последние товары</h3>
        <Row>
          {products.map((item, index) =>{
            return (
              <Col key={item._id} sm={12} md={6} lg={2}>
                  <Product product={item}/>
              </Col>
            );
          })}
        </Row>
      </div>
    );
}

export default HomeScreen
