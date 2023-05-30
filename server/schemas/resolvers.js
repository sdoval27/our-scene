const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Events } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not Logged in');
        },

        users: async (parent, { username }) => {
            return User.find({ username })
        },

        feed: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },



        events: async () => {
            try {
                // Fetch event data from the API
                const response = await axios.get('https://edmtrain.com/api/events?', {
                    headers: {
                        Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
                    },
                });

                // Map and save the event data to your Event model
                const eventData = response.data
                const events = eventData.map((data) => {
                    return new Events({
                        name: data.name,
                        date: data.date,
                        venue: data.venue,
                        // Map other relevant fields from the API response to your Event model
                    });
                });
                await Events.insertMany(events); // Save the events to the database
                // Return the events
                return events;
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        },
    },



    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },

        createPost: async (parent, { content }, context) => {
            if (context.user) {
                // Check if content is provided and not empty
                if (!content || content.trim() === '') {
                    throw new Error('Post content cannot be empty');
                }

                const post = await Post.create({
                    content,
                    user: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );

                return post;
            }

            throw new AuthenticationError('Not logged in');
        },

        deletePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    user: context.user._id
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                );

                return post;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
};

module.exports = resolvers;


// createPost: async (parent, { content }, context) => {
//     if (context.user) {
//         const post = await Post.create({
//             content,
//             user: context.user.username,
//         });
//         await User.findOneAndUpdate(
//             { _id: context.user._id },
//             { $addToSet: { posts: post._id  } }
//           );
//     }
//     throw new AuthenticationError('Not logged in');
// },





