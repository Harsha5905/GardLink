const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    package: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);