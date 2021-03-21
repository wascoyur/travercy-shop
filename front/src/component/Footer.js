import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Adapted by @wascoyur
          </Col>
        </Row>
        <Row>
          <Col>backend</Col>
          <Col>Express, Atlas MongoDB</Col>
        </Row>
        
        <Row>
          <Col>frontend</Col>
          <Col>React, Bootstrap, Redux </Col>
        </Row>
      </Container>

    </footer>
  )
}

export default Footer
