const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        userPost: {
            type: String,
            ref: 'User',
            trim: true,
        },

        content: {
            type: String,
            required: true,
            unique: true,
        },

        event: {
            type: String,
            ref: 'Event',
            required: true,
        },
        
        userLocation: {
            type: String,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        

    })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;