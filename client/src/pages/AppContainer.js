import React, { useState } from 'react';

import Concerts from './Concerts';
import Post from './Post';
import Profile from './Profile';
import Navbar from "../components/Navbar";

export default function AppContainer() {
  const [currentPage, setCurrentPage] = useState('Concerts');

  const renderPage = () => {
    if (currentPage === 'Concerts') {
      return <Concerts />;
    }
    if (currentPage === 'Post') {
      return <Post />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>

      {renderPage()}
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />

    </div>
  );
}