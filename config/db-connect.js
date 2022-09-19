//Requirements 
const mongoose = require('mongoose');

//DB connection

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

//Exports

module.exports = mongoose.connection;