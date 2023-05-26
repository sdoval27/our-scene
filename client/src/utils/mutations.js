import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      _id
      content
      createdAt
      userLocation
      event{
        _id
        name
        description
        date
        venue
      }
      user{
        _id
        username
      }
    }
  }
`;

