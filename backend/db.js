const mongoose = require('mongoose');
const monogoURI = process.env.DATABASE_URI
const connectToMongo = () => {
    mongoose.connect(monogoURI, () => {
        console.log("connected to MongoDB successfully");
    })
}
module.exports = connectToMongo