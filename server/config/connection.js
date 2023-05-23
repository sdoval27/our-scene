const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb://localhost/our-scene');

module.exports = mongoose.connection;