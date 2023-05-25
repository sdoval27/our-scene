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
import { ADD_USER } from '../utils/mutations';
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

const SForm = () => {


  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [addUser, {error}] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }else{
      setShowAlert(false);
    }
  }, [error]);

  //login
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log({...userFormData})
      const {data} = await addUser ({
        variables: {...userFormData},
      });

      console.log (data);
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };


  return (
    <>
      <Container>
        <Card style={styles.Card}>
          <h4 style={styles.Text}>Sign up to connect with others</h4>
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
                <Form.Label htmlFor='email' style={styles.Text}>Email:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type='text'
                  placeholder=''
                  name='email'
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
            <a href='/concerts'><Button style={styles.Button}>Sign Up</Button></a>
          </Row>

        </Card>

      </Container>
    </>
  )
}

export default SForm;