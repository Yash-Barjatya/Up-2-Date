const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.DATABASE_URI;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }

};
module.exports = connectToMongo;
