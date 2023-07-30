require('dotenv').config()
const connectToMongo = require('./db');
const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors')

//middleware
app.use(cors())// to fix the error of using 3000 in 5000 port
app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Up-2-Date server");
});
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, async () => {
    try {
        await connectToMongo();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
    console.log(`Up-2-Date server is listening to port ${port}`)
})