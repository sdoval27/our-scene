import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import Post from '../pages/Post';

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faIcons, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

//styling
import './styles/Navbar.css';

//auth
import Auth from '../utils/auth';

const AppNavbar = ({ currentPage, handlePageChange }) => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className="lowernav footer" bg='dark' variant='dark' expand='lg'>
        <Container fluid>

          <nav className='ml-auto d-flex'>
            <a
              href="/"
              // onClick={() => handlePageChange('Home')}
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
              // onClick={() => handlePageChange('Post')}
              className={currentPage === 'Post' ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#00ffbf", }} />
            </a>

                {/* move link to profile page here*/}
                <a
              href='/profile'
              // onClick={() => handlePageChange('Profile')}
              className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}>
              <FontAwesomeIcon icon={faUser} style={{ color: "#f50000", }} />
            </a>

                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link className=" link" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            )}
          </nav>

        </Container>
      </Navbar>     
    </>
  );
};

export default AppNavbar;