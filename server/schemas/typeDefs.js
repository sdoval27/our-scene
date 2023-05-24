const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!

  }

  type Post {
    _id: ID!
    content: String!
    createdAt: String!
    user: User!

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