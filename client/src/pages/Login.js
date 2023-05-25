import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LForm from '../components/LForm'



const styles = {
  Default: {
    display: 'inline'
  },
  Frame: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px'
  }

}

export default function Login() {
  return (
    <Container style={styles.Default}>    
      <Row>
        <Col></Col>
        <Col xs={12} md={8} style={styles.Frame}>          
          <LForm />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
};

