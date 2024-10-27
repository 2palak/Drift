const express = require('express');
const router = express.Router();
const DriftFeedback = require('../models/rating');

// POST Route to Store Feedback
router.post('/feedback', async (req, res) => {
    try {
        console.log('Received from frontend:', req.body);  // Log incoming data

        // Destructure fields from request body with defaults
        const { userName, feedback, reaction } = req.body;

        // Create a new feedback document
        const newFeedback = new DriftFeedback({
            userName: userName ? userName.trim() : null, // Match field name with the schema
            feedback: feedback ? feedback.trim() : null, // Required field
            reaction: reaction ? reaction.trim() : null  // Match field name with the schema
        });

        // Save to MongoDB
        const savedFeedback = await newFeedback.save();
       // console.log('Saved feedback data:', savedFeedback);

        res.status(201).json({ message: 'Feedback submitted successfully', data: savedFeedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

// GET Route to Fetch Feedbacks
router.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await DriftFeedback.find(); // Fetch all feedbacks from MongoDB
        res.status(200).json(feedbacks); // Send feedbacks to the frontend
        console.log(feedbacks); // Debugging line
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
});

module.exports = router;
