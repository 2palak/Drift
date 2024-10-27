const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; // Use the connection string from .env file

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,  // Allows the use of the new URL string parser
            useUnifiedTopology: true // Enables the new topology layer
        });
        console.log("Connected to MongoDB");
        // Your data fetching code...
        mongoose.connection.once('open', async () => {
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log("Collections:", collections.map(col => col.name));
          });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; 
    }
};

module.exports = connectToMongoDB;
