import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import './style/Login.css';

const Login = (props) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

<<<<<<< HEAD
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
=======
<<<<<<< HEAD
const styles = {
<<<<<<< HEAD
  Center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Space: {
    padding: '10px'
  },
  Disk: {
    borderStyle: 'solid',
    borderRadius: '5px'
  }
}

export default function Login() {
  return (
    <div style={styles.Center}>
      <div className="row" style={styles.Space}></div>

      <div className="row">        
      </div>
      <LForm />
    </div>
  )
};
=======
  Card: {}
  }

=======
>>>>>>> c1518f26863eaaed0124264861f61a9ebf4db852
>>>>>>> d8ac0005abec7e0e8433ddb23ea72b4dfcc904c9

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

<<<<<<< HEAD
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
=======
>>>>>>> 6a6b0deaf90a4c3ac4949d9b8dcd4c993a976d25
>>>>>>> d8ac0005abec7e0e8433ddb23ea72b4dfcc904c9

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 Text">
      <div className="col-12 col-lg-10">
        <div className="card Card">
          <div className="Flair">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={userFormData.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={userFormData.password}
                  onChange={handleChange}
                />
                  <div className ="row">
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                </div>
              </form>

              
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
          Don't Have an Account?
          <div className ="row">
          Sign up <Link to = {"../Signup"}>Here!</Link>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
