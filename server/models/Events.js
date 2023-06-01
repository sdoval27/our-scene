const mongoose = require('mongoose');
const { Schema } = mongoose;


const venueSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  // You can add more properties as needed
});



const eventSchema = new Schema({
  name: {
    type: String,

  },

  date: {
    type: String,

  },

  venue: {
    type: venueSchema,

  },
});

const Events = mongoose.model('Event', eventSchema);

module.exports = Events;