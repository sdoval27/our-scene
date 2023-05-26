import { gql } from '@apollo/client';

<<<<<<< HEAD
export const QUERY_ME = gql`
   {
        me {
            _id
            username
            email
            events
            posts 
        }
    }
`;
=======
export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      content
      createdAt
      event
      userLocation
      user{
        _id
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      events {
        _id
        name
        description
        date
        venue
      }
    }
  }
`;
>>>>>>> 3b58dba2dfdac5caaee3aa00001f4c338857e0d6
