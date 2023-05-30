import React, { useState } from 'react';
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
    borderRadius: '6px'
  },
  Card: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'
=======
    background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '1px',
    width: '40vh',
    height: '50vh',
    marginLeft: 'auto',
    marginRight: 'auto'
>>>>>>> 6a6b0deaf90a4c3ac4949d9b8dcd4c993a976d25
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
          <h1 style={styles.Text}>Konnect</h1>
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
<<<<<<< HEAD
              <Button style={styles.Button}>Login</Button>
=======
            <a href = 'profile'>
              <Button style={styles.Button}>Login</Button>
              </a>
>>>>>>> 6a6b0deaf90a4c3ac4949d9b8dcd4c993a976d25
            </Col>
          </Row>
          <Row>
            Don't Have an Account?
          </Row>
          <Row>
<<<<<<< HEAD
            <Button style={styles.Button}>Sign Up Here!</Button>
=======
            <a href = 'signup'>
            <Button style={styles.Button}>Sign Up Here!</Button>
            </a>
>>>>>>> 6a6b0deaf90a4c3ac4949d9b8dcd4c993a976d25
          </Row>

        </Card>

      </Container>
    </>
  )
}

export default LForm;