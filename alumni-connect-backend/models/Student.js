const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);