import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';


import Concerts from './pages/Concerts';
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


function App() {
  return (
    <div style={styles.Background}>
    <ApolloProvider client={client}>
      <Router>
        <>
        <Header />
          <Routes>
            <Route
              path='/'
              element={<Concerts />}
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
