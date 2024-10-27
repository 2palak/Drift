/*const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db'); // Import the connectToMongoDB function
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// User route for registration and login
const createUserRoute = require('./routes/CreateUser');
app.use('/api', createUserRoute);

// Feedback route addition
const feedbackRoute = require('./routes/FeedbackUser');
app.use('/api', feedbackRoute); // Using the same base `/api` route

// Proxy requests to Flask API
app.use('/api/flask', createProxyMiddleware({
    target: 'http://localhost:5001',  // Flask server URL
    changeOrigin: true,
}));

// Start the Node.js server
//app.listen(5001, () => {
    //console.log(`Node.js server running on http://localhost:${PORT}`);
    //console.log('Node.js server with Flask proxy running on http://localhost:5001');
//});
app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
    console.log('Node.js server with Flask proxy running on http://localhost:5001');
});
*/

const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db'); // Import the connectToMongoDB function
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and parse JSON
// Use CORS with specific origin instead of wildcard
app.use(cors({
    origin: 'http://localhost:3000',  // Specify the React frontend's URL
    credentials: true  // If you are dealing with cookies, sessions, etc.
}));
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// User route for registration and login
const createUserRoute = require('./routes/CreateUser');
app.use('/api', createUserRoute);

// Feedback route addition
const feedbackRoute = require('./routes/FeedbackUser');
app.use('/api', feedbackRoute); // Using the same base /api route

// Proxy requests to Flask API
app.use('/api/flask', createProxyMiddleware({
    target: 'http://localhost:5001',  // Flask server URL
    changeOrigin: true,
}));

// Start the Node.js server on the correct port
app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});
