import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' expand='sm' variant='dark' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Shop-Traversy</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i>
                Корзина
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user'></i>Вход
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
