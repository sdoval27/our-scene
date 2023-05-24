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
    content: String!
    createdAt: String!
    user: User!
    event: Events
  }

  type Events {
    _id: ID!
    name: String!
    description: String!
    date: String!
    venue: String!
    user: User!
    posts: [Post]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts: [Post]
    post(postId: ID!): Post
    events: [Events]
    event(eventId: ID!): Events
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPost(content: String!): Post
    deletePost(postId: ID!): Post
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;