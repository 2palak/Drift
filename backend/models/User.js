const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Fix here: Change `UserSchema` to `userSchema`
const User = mongoose.model('drift_user', userSchema);
module.exports = User;
