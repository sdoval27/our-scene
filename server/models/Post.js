const { Schema } = require('mongoose');

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;