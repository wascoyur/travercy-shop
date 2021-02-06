import React from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutStep = (step1, step2, step3, step4) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <NavLink>Вход</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Вход</NavLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <NavLink>Доставка</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Доставка</NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <NavLink>Оплата</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Оплата</NavLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <NavLink>Подтверждающие документы</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Подтверждающие документы</NavLink>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
