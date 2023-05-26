// const axios = require('axios');
// const Event = require('./models/Event');

// // Function to fetch event data from EDMtrain API
// async function fetchEventData() {
//   try {
//     const response = await axios.get('https://api.edmtrain.com/events');
//     const eventData = response.data; // Assuming the response data is an array of events

//     // Map and save the event data to your Event model
//     const events = eventData.map((event) => {
//       return new Event({
//         name: event.name,
//         date: event.date,
//         venue: event.venue,
//         // Map other relevant fields from the API response to your Event model
//       });
//     });

//     await Event.insertMany(events); // Save the events to the database
//     console.log('Event data imported successfully!');
//   } catch (error) {
//     console.error('Error fetching event data:', error);
//   }
// }

// // Call the fetchEventData function to populate your Event models
// fetchEventData();