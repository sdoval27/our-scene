import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';


import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home';
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
  uri: '/graphql',
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

const styles = {
  Background: {
  background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  width: '100%',
}
}

function App() {
    
  return (
    <div style={styles.Background}>
    <ApolloProvider client={client}>
      <Router>
        <>
        <Header />
          <Routes>
          <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/post'
              element={<Post/>}/>

            <Route
              path='/profile'
              element={<Profile/>}
              />

          </Routes>
          <Navbar/>
        </>
      </Router>
    </ApolloProvider>
    </div>

  );
}

export default App;
