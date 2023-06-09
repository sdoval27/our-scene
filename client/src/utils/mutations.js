import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username                
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;


export const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      _id
      content
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

export const UPLOAD_PROFILE_IMAGE = gql `
  mutation uploadProfileImage($image: Upload!) {
    uploadProfileImage(image: $image) {
      avatar
    }
  }
`;

export const UPDATE_USER_BIO = gql `
  mutation updateUserBio($bio: String!) {
    updateUserBio(bio: $bio) {
      bio
    }
  }
`;