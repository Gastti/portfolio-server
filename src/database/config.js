const mongoose = require('mongoose');
const config = require('../../config');

const dbconnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.mongodb.CNN);
        console.log('Database online.');
    } catch (error) {
        console.log(error);
        throw new Error('Database initialization failed.');
    }
}

module.exports = {
    dbconnection
}