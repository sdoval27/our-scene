import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import Post from '../pages/Post';

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faIcons, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Auth from '../utils/auth';

const styles = {
  Center: {
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
},
}

const AppNavbar = ({ currentPage, handlePageChange }) => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' style={styles.Center}>
        <Container fluid>

          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <a
                href="/"
                onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}>
                {/* link to home page */}
                <FontAwesomeIcon icon={faIcons} />
              </a>
              <a
                href='/post'
                onClick={() => handlePageChange('Post')}
                className={currentPage === 'Post' ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00ffbf", }} />
              </a>
              <a
              href='/profile'
              onClick={() => handlePageChange ('Profile')}
              className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", }} />
              </a>

              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  {/* move link to post page here*/}
                  <a
                    href='/post'
                    onClick={() => handlePageChange('Concerts')}
                    className={currentPage === 'Concerts' ? 'nav-link active' : 'nav-link'}>
                    <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00ffbf", }} />
                  </a>

                  {/* move link to profile page here*/}
                  <Nav.Link as={Link} to='/profile'>
                    <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", }} />
                  </Nav.Link>

                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>     
    </>
  );
};

export default AppNavbar;