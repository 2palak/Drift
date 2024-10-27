const mongoose = require('mongoose');
const { Schema } = mongoose;

const driftFeedbackSchema = new Schema({
    userName: {   // Change `name` to `userName` to match frontend
        type: String,
        required: false,   // Optional field
        default: null
    },
    feedback: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: false,   // Optional field
        default: null
    },
    createdAt: {   // Changed `date` to `createdAt` for consistency
        type: Date,
        default: Date.now
    }
});

const DriftFeedback = mongoose.model('drift_feedback', driftFeedbackSchema);
module.exports = DriftFeedback;
