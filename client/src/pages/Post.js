import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import './style/Post.css';
import AuthService from '../utils/auth';


//api
//gimport axios from "axios";

//post concert
import { CREATE_POST } from '../utils/mutations';
//prev posts and user info
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const PostForm = () => {
  const [content, setContent] = useState('');

  const {data} = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  console.log('posts:', posts);

  //show concert data from API
  const [showData, setShowData] = useState(false);
  const [apiData, setApiData] = useState([]);

  //render api data
//   const fetchData = async () => {
//     try{
//     const response = await axios.get(
//       'https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07',
//       {
//         headers: {
//           Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07',
//         },
//       }
//     );
//     const eventDataArray = response.data.data;
//     setEvents(eventDataArray);
//   } catch (error) {
//     console.error('Error fetching event data:', error);
//   }
// };

//   const handleToggle = () => {
//     setShowData(!showData);
//   };

  //chara count box
  const [characterCount, setCharacterCount] = useState(0);


  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      try {
        const queryPostsData = cache.readQuery({ query: QUERY_POSTS });
        const queryMeData = cache.readQuery({ query: QUERY_ME });
  
        // Check if the query data exists and has the expected structure
        if (queryPostsData && queryMeData) {
          const { content } = queryPostsData;
          const { me } = queryMeData;
  
          // Update the cache only if the necessary data is available
          if (content && Array.isArray(content) && me) {
            cache.writeQuery({
              query: QUERY_POSTS,
              data: { content: [createPost, ...content] },
            });
  
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, content: [...me.content, createPost] } },
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  });
  

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const username = AuthService.getUser().data.username;
    // console.log('username:', username);

    console.log('Form submitted');

    try {
      console.log('Username:', username);
      
        const { data } = await createPost({
          variables: {
            content,
            //err
            user: AuthService.getUser().data.username,
          },
        });
        console.log('Mutation response:', data);
      
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
    <div className='container'>
      <h3 className='title'>Where to next?</h3>

      {/* {Auth.loggedIn() ? ( */}
      <>
      {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className=" col-12 col-lg-9">
            <textarea
              name="content"
              placeholder="Concert Deets Here!"
              value={content}
              method="POST"
              className="placeholder-text form text form-input w-100"
              style={{ resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* <div className=" desktop d-flex">
            <button className="button-style text btn btn-primary" type="submit">
              Post!
            </button>
          </div> */}

          <p
            className={`char-text text m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>

          <div className='align-buttons'>

           {/* concert toggle */}
           {/* <div>
          
          <button className='toggle' onClick={handleToggle}>
            {showData ? 'Hide Concerts' : 'Display Concerts'}
            {events.length > 0 ? (
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>Venue: {event.venue}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>Loading events...</p>
    )}
          </button>
          {showData && (
            <div>
              {/* Display the fetched API data here 
               {apiData.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          )} 
               </div> */}
         

          <div className="col-12">
            <button className="button-style text btn btn-primary" type="submit">
              Post!
            </button>
          </div>
          
          </div>
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

