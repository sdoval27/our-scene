const axios = require('axios');
const db = require('../config/connection');
const { Events } = require('../models');

const seedEvents = async () => {
  try {
    // Fetch event data from the API
    const response = await axios.get(
      'https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07',
      {
        headers: {
          Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07',
        },
      }
    );

    const eventDataArray = response.data.data;
    const events = eventDataArray.map(event => {
      const { name, date, venue } = event;
      return new Events({
        name: name,
        date: date,
        venue: venue,
      });
    });
  
    await Events.insertMany(events);
    console.log('Seed event data completed.');
    return events;
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
};

seedEvents()




















// const seedDataNames = async () => {
//   try {
//     // Fetch event data from the API
//     const response = await axios.get('https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07', {
//       headers: {
//         Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
//       },
//     });

//     const eventDataArray = response.data.data;
//     const eventNames = eventDataArray
//       .filter(event => event.name)
//       .map(event => event.name);
//     console.log(eventNames);

//     // Map and save the event data to Event model
//     const events = eventNames.map(name => {
//       return new Events({
//         name: name,
//       });
//     });
//     await Events.insertMany(events);
//     console.log('Seed event names Completed.');
//     // // Return the events
//     return events;

//   } catch (error) {
//     console.error('Error fetching event data:', error);
//     throw new Error('Unable to fetch event data');
//   }

// };


// const seedDataDates = async () => {
//   try {
//     // Fetch event data from the API
//     const response = await axios.get('https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07', {
//       headers: {
//         Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
//       },
//     });

//     const eventDataArray = response.data.data;
//     const eventDates = eventDataArray
//       .filter(event => event.date)
//       .map(event => event.date);
//     console.log(eventDates);

//     // Map and save the event data to Event model
//     const events = eventDates.map(date => {
//       return new Events({
//         date: date,
//       });
//     });
//     await Events.insertMany(events);
//     console.log('Seed event dates completed.');
//     // Return the events
//     return events;

//   } catch (error) {
//     console.error('Error fetching event data:', error);
//     throw new Error('Unable to fetch event data');
//   }

// };

// const seedDataVenues = async () => {
//   try {
//     // Fetch event data from the API
//     const response = await axios.get('https://edmtrain.com/api/events?client=55c6fa44-317f-4384-8d3e-ebb7d1afbb07', {
//       headers: {
//         Authorization: '55c6fa44-317f-4384-8d3e-ebb7d1afbb07'
//       },
//     });

//     const eventDataArray = response.data.data;
//     const eventVenues = eventDataArray
//       .filter(event => event.venue)
//       .map(event => event.venue);
//     console.log(eventVenues);

//     // Map and save the event data to Event model
//     const events = eventVenues.map(venue => {
//       return new Events({
//         venue: venue,
//       });
//     });
//     await Events.insertMany(events);
//     console.log('Seed event venues completed.');
//     // // Return the events
//     return events;

//   } catch (error) {
//     console.error('Error fetching event data:', error);
//     throw new Error('Unable to fetch event data');
//   }

// };


// seedDataNames()
// seedDataDates()
// seedDataVenues()
