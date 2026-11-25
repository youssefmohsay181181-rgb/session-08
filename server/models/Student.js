const mongoose = require("mongoose");


const student_schema = mongoose.Schema({
    name: { type: String, 
             required: true,
             maxlength: 20 },
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
