import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


//post concert
import { CREATE_POST } from '../utils/mutations';
//prev posts and user info
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const PostForm = () => {
  const [content, setContent] = useState('');


  const [characterCount, setCharacterCount] = useState(0);


  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
        //update event list, meaning we need to set up query for events list
      try {
        const { content } = cache.readQuery({ query: QUERY_POSTS });


        cache.writeQuery({
          query: QUERY_POSTS,
          data: { content: [createPost, ...content] },
        });
      } catch (e) {
        console.error(e);
      }


      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, content: [...me.content, createPost] } },
      });
    },
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const { data } = await createPost({
        variables: {
          content,
          user: Auth.getProfile().data.username,
        },
      });


      setContent('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;


    if (name === 'content' && value.length <= 280) {
      setContent(value);
      setCharacterCount(value.length);
    }
  };


  return (
    <div>
      <h3>Where to next?</h3>


      {/* {Auth.loggedIn() ? ( */}
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
                name="content"
                placeholder="Check out this latest event..."
                value={content}
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
      {/* ) : (
        <p>
          You need to be logged in to post content. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )} */}
    </div>
  );
};


export default PostForm;
