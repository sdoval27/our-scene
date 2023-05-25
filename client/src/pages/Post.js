import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


//post concert
import { ADD_CONCERT } from '../../utils/mutations';
//prev Concerts and user info
import { QUERY_CONCERTS, QUERY_ME } from '../../utils/queries';


import Auth from '../../utils/auth';


const PostForm = () => {
  const [concertText, setConcertText] = useState('');


  const [characterCount, setCharacterCount] = useState(0);


  const [addConcert, { error }] = useMutation(ADD_CONCERT, {
    update(cache, { data: { addConcert } }) {
      try {
        const { concerts } = cache.readQuery({ query: QUERY_CONCERTS });


        cache.writeQuery({
          query: QUERY_CONCERTS,
          data: { concerts: [addConcerts, ...concerts] },
        });
      } catch (e) {
        console.error(e);
      }


      //remove?? ASK SINCLAIR
      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, concerts: [...me.concerts, addConcert] } },
      });
    },
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const { data } = await addConcert({
        variables: {
          concertText,
          user: Auth.getProfile().data.username,
        },
      });


      setConcertText('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;


    if (name === 'concertText' && value.length <= 280) {
      setConcertText(value);
      setCharacterCount(value.length);
    }
  };


  return (
    <div>
      <h3>Where to next?</h3>


      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="concertText"
                placeholder="Check out this latest event..."
                value={concertText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>


            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Post!
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post content. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};


export default PostForm;
