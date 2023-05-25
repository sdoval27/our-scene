import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const styles = {
  Text: {
  fontFamily: 'Orbitron',
  fontWeight: 'bold',
  color: 'white',
  textShadow: '2px 2px #000000'
  
},
  Button: {
    color: 'white',
    backgroundColor: '#0074FF',
    borderRadius: '6px'
  },
  Card: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'
  }
}


const LForm = () => {

  const [userFormData, setUserFormData] = useState({ username: '', password: '' });

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  


  

  //login
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  return (
    <>
      <Container>
        <Card style={styles.Card}>
          <h1 style={styles.Text}>Untitled App</h1>
          <Form>
            <Row>
              <Col>
                <Form.Label htmlFor='username' style={styles.Text}>Username:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type='text'
                  placeholder=''
                  name='username'
                  onChange={handleInputChange}
                  value={userFormData.username}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label htmlFor='password' style={styles.Text}>Password:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type='text'
                  placeholder=''
                  name='password'
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
              </Col>
            </Row>
          </Form>
          <Row>

            <Col>
            <a href = '/concerts'><Button style={styles.Button}>Login</Button></a>
            </Col>
          </Row>
          <Row>
            Don't Have an Account?
          </Row>
          <Row>
            <a href = '/signup'><Button style={styles.Button}>Sign Up Here!</Button></a>
          </Row>

        </Card>

      </Container>
    </>
  )
}

export default LForm;