const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    events: [Events]
    posts: [Post]
  }

  type Post {
    _id: ID!
    user: User!
    content: String!
    event: Events!
    userLocation: String!
    createdAt: String!
  }

  type Events {
    _id: ID!
    name: String!
    description: String!
    date: String!
    venue: String!
    artistList: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    feed: [Post]
  }

  type Mutation {
    addUser(
      username: String! 
      email: String! 
      password: String!
      ): Auth
    login(
      email: String! 
      password: String!
      ): Auth
    createPost(
      content: String!
      ): Post
    deletePost(
      postId: ID!
      ): Post
  }
`;

module.exports = typeDefs;