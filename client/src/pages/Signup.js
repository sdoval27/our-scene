import React, { useState, useEffect } from 'react';

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap';

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
    borderRadius: '6px',
    fontFamily: 'Helvetica Neue'
  },
  Card: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '1px',
    width: '40vh',
    height: '50vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  Flair: {
    marginTop: '10px',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'white',
    width: '35vh',
    height: '45vh',
    padding: '5px'
  }
}

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';


const Signup = () => {

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

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
      console.log({ ...userFormData })
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);
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
          <Card style={styles.Flair}>
            <h4 style={styles.Text}>Signup to connect with others</h4>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              {/* show alert if server response is bad */}
              <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your signup!
              </Alert>
              <Row>
                <Form.Group className='mb-3'>
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
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className='mb-3'>
                  <Col>
                    <Form.Label htmlFor='email' style={styles.Text}>Email:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type='email'
                      placeholder=''
                      name='email'
                      onChange={handleInputChange}
                      value={userFormData.username}
                      required
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className='mb-3'>
                  <Col>
                    <Form.Label htmlFor='password' style={styles.Text}>Password:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder=''
                      name='password'
                      onChange={handleInputChange}
                      value={userFormData.password}
                      required
                    />

                  </Col>
                </Form.Group>
              </Row>
            </Form>
            <Row>
              <Button style={styles.Button}>Submit</Button>
            </Row>
          </Card>
        </Card>

      </Container>
    </>
  )
}

export default Signup;