const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            unique: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        userLocation: {
            type: String,
            required: true,
        }
    })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;