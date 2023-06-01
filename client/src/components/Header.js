import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import SForm from './SForm';
import LForm from './LForm';

import Auth from '../utils/auth';

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faIcons, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

//styling
import "./styles/Header.css";

const styles = {
  Center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const AppHeader = (handlePageChange, currentPage) => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className='topnav header' bg='dark' variant='dark' expand='lg'>
        <Container fluid style={styles.Center}>
          <Navbar.Brand as={Link} to='/login' className='title' styling='headerText'>
            Konnect
          </Navbar.Brand>
          <Nav className=' hide icon center ml-auto d-flex'>
            <a
              href="/"
              onClick={() => handlePageChange('Home')}
              className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}>
              {/* link to home page */}
              <FontAwesomeIcon icon={faIcons} style={{ color: "#C600E9"}}/>
            </a>
            <a
              href='/post'
              onClick={() => handlePageChange('Post')}
              className={currentPage === 'Post' ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00E986", }} />
            </a>
            <a
              href='/profile'
              onClick={() => handlePageChange('Profile')}
              className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", }} />
            </a>
            </Nav>
        </Container>
      </Navbar>    
    </>
  );
};

export default AppHeader;