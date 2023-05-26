import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Tab } from 'react-bootstrap';


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

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' style={styles.Center}>
        <Container fluid>

          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <a
                href="/concert"
                onClick={() => handlePageChange('Concerts')}
                className={currentPage === 'Concerts' ? 'nav-link active' : 'nav-link'}>
                {/* link to event page */}
                <FontAwesomeIcon icon={faIcons} style={{ padding: "5px"}}/>
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
                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00ffbf", padding: "5px"}} />
              </a>
              <span>  </span>
              <a
              href='/profile'
              onClick={() => handlePageChange ('Profile')}
              className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", padding: "5px"}} />
              </a>           
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
    </>
  );
};

export default AppNavbar;