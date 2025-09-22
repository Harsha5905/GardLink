const mongoose = require('mongoose');

const AlumniSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    passedOutYear: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alumni', AlumniSchema);