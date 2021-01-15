import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../component/Message';
import {} from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  
  return (
    <div>
      <h2>CartScreen</h2>
    </div>
  );
};

export default CartScreen;
