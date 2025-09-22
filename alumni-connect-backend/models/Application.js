const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    resumePath: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);