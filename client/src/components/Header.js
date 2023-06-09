import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

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
          <Navbar.Brand as={Link} to='/' className='title' styling='headerText'>
          <h1>Rave Buddy</h1>        
          </Navbar.Brand>
          <nav className='icon center ml-auto d-flex'>
          <a
              href="/"
              className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}>
              {/* link to home page */}
              <FontAwesomeIcon icon={faIcons} style={{ color: "#C600E9" }} />
            </a>
            {/* if user is logged in show saved books and logout */}
            {Auth.loggedIn() ? (
              <>
                {/* move link to post page here*/}
                <a
                  href='/post'
                  className={currentPage === 'Concerts' ? 'nav-link active' : 'nav-link'}>
                  <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00ffbf", }} />
                </a>

                {/* move link to profile page here*/}
                <a
                 href='/profile'
                 className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", }} />
                </a>

                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to='/login' className=" link" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            )}
      
          </nav>
        </Container>
      </Navbar>
</>
  );
};

export default AppHeader;