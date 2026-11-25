const mongoose = require("mongoose");


const student_schema = mongoose.Schema({
    name: { type: String, 
             required: true,
             maxlength: 20 },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    age: Number,
    department: Number,
    hobbies: [String],
    address: {
        street: String,
        city: String,
        country: String
    }
});

module.exports = mongoose.model('Student', student_schema);
