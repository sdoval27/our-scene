const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
   _id: ID!
    username: String!
    email: String!
    password: String!
    posts: [Post]
    profileImage: String
    bio: String
    preferences: String
  }

  type Post {
    _id: ID!
    userPost: String!
    content: String!
    event: Events
    userLocation: String
    createdAt: String
    user: User
    venue: Venue
  }

type Venue {
    _id: ID!
    name: String!
    location: String!
    address: String!
    state: String!
    latitude: String!
    longitude: String!
  }

  type Events {
    _id: ID!
    name: String!
    date: String!
    venue: Venue
    description: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    events: [Events]
    posts: [Post]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login( email: String!, password: String!): Auth
    editProfile(profileImage: String, bio: String, preferences: String): User
    createPost(content: String!): Post
    addEvent(name: String!, date: String!, venue: String!): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;