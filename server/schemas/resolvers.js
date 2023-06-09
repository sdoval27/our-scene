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

        users: async () => {
            return User.find()
        },

        posts: async () => {
            return Post.find().sort({ createdAt: -1 });
          },

        events: async () => {
            try {
                // Fetch event data from the API
                const response = await axios.get('https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07', {
                    headers: {
                        Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
                    },
                });

                const eventDataArray = response.data.data;
                const events = eventDataArray.map(event => {
                    const { name, date, venue } = event;
                    const { venueName, location, address, state, latitude, longitude } = venue;

                    const eventName = name || "Unknown";
                    const venueData = {
                        name: venueName || "Unknown",
                        location: location || "Unknown",
                        address: address || "Unknown",
                        state: state || "Unknown",
                        latitude: latitude || "Unknown",
                        longitude: longitude || "Unknown"
                    };

                    return new Events({
                        name: eventName,
                        date: date,
                        venue: venueData,
                    });
                });
                console.log(events);
                return events;
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            console.log('user is', user);
            const token = signToken(user);
            console.log('token is', token);
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

        editProfile: async (parent, { profileImage, bio, preferences }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { profileImage, bio, preferences },
                    { new: true }
                );

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

    },
};

module.exports = resolvers;




// events: async () => {
//     try {
//         // Fetch event data from the API
//         const response = await axios.get('https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07', {
//             headers: {
//                 Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
//             },
//         });
//         const eventDataArray = response.data.data;
//         const eventNames = eventDataArray.map(event => event.name);
//         console.log(eventNames);

//         // Map and save the event data to your Event model
//         const events = eventNames.map(name => {
//             return new Events({
//                 name: name,
//             });
//         });

        // await Events.insertMany(events); // Save the events to the database
//         // // Return the events
//         return eventDataArray;
//     } catch (error) {
//         console.error('Error fetching event data:', error);
//     }
// },
// },








