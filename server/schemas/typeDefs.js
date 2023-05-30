const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
   _id: ID!
    username: String!
    email: String!
    password: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    userPost: String!
    content: String!
    event: Events
    userLocation: String
    createdAt: String!
  }

  type Events {
    _id: ID!
    name: String!
    date: String!
    venue: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
    feed: [Post]
    users: [User]
    events: [Events]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login( email: String!, password: String!): Auth
    createPost(content: String!, eventId: ID): Post
    addEvent(name: String!, date: String!, venue: String!): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;