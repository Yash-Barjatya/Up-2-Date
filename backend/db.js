const mongoose = require('mongoose');
const monogoURI = process.env.DATABASE_URI
// console.log(monogoURI);
const connectToMongo = () => {
    mongoose.connect(monogoURI, { useNewUrlParser: true })
        .then(() => {
            console.log("Connected to MongoDB successfully..")
        }).catch(err => {
            console.log(err.message);
        })
    // mongoose.connect(monogoURI, () => {
    //     console.log("connected to MongoDB successfully");
    // })
}
module.exports = connectToMongo
// mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
//     .then(() => {
//         console.log("Connected to MongoDB successfully..")
//     }).catch(err => {
//         console.log(err.message);
//     })