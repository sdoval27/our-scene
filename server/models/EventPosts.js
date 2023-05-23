const mongoose = require('mongoose');

const eventPostSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

const EventPost = mongoose.model('EventPost', eventPostSchema);

module.exports = EventPost;