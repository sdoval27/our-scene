const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  
  venue: {
    type: String,
    required: true,
  },


});

const Events = mongoose.model('Event', eventSchema);

module.exports = Events;