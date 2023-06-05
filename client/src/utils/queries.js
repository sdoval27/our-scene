import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      content
      userPost
      createdAt
      event {
        _id
        name
        date
        description
        venue 
      }
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
        venue {
          _id
          name
          location
          address
          state
          latitude
          longitude
        }
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      name
      description
      date
      venue
    }
  }
`;


export const QUERY_VENUE = gql`
  query getVenue {
    venue {
      _id
      name
      location
      address
      state
      latitude
      longitude
    }
  }
`;
