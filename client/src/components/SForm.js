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
  }
}


const SForm = () => {

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
        <Card>
          <h4 style={styles.Text}>Signup to connect with others</h4>
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
            <Button style={styles.Button}>Sign Up</Button>
          </Row>

        </Card>

      </Container>
    </>
  )
}

export default SForm;