import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import Auth from '../utils/auth';

const styles = {
  Center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const AppHeader = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid style={styles.Center}>
          <Navbar.Brand as={Link} to='/login' styling='headerText'>
          <h1>BeatMeet/Unity/Vibetribe/ElectroHangout/ElectroLink</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>    
    </>
  );
};

export default AppHeader;