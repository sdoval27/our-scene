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
    borderRadius: '6px'
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


const Login = () => {

  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //login
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    //clears form values
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };


//still needs validation
  return (
    <>
      <Container>
        <Card style={styles.Card}>
          <Card style={styles.Flair}>
            <h1 style={styles.Text}>Konnect</h1>
            {/* start of form */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your login credentials!
              </Alert>
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
                    type='password'
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
                <a href='profile'>
                  <Button style={styles.Button}>Login</Button>
                </a>
              </Col>
            </Row>
            <Row>
              Don't Have an Account?
            </Row>
            <Row>
              <a href='signup'>
                <Button style={styles.Button}>Sign Up Here!</Button>
              </a>
            </Row>
          </Card>
        </Card>

      </Container>
    </>
  )
}

export default Login;