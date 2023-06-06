import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import Header from './components/Header';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Post from './pages/Post';
import Profile from './pages/Profile';
import Navbar from "./components/Navbar";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  // let location = useLocation();
  // console.log('location is', location);
  // const { pathname } = location;
  // console.log('pathname is', pathname);
  // const NavRender = !(pathname === '/login' || pathname === '/signup');

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/post'
              element={<Post />} />

            <Route
              path='/profile'
              element={<Profile />}
            />

          </Routes>
          <Navbar />
          {/* {NavRender && <Navbar />} */}
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
