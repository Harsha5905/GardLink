const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const Job = require('../models/Job');
const Application = require('../models/Application');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

router.post('/', auth, async (req, res) => {
    try {
        const newJob = new Job({
            user: req.user.id,
            company: req.body.company,
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            experience: req.body.experience,
            package: req.body.package
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('user', ['name', 'email']).sort({ date: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:jobId', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to delete this job' });
        }
        await job.deleteOne();
        res.json({ msg: 'Job removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my-jobs', auth, async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).sort({ date: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my-applications', auth, async (req, res) => {
    try {
        const jobsPostedByUser = await Job.find({ user: req.user.id }).select('_id');
        const jobIds = jobsPostedByUser.map(job => job._id);
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate('student', ['name', 'email', 'mobile', 'branch'])
            .populate('job', ['title', 'company']);
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/apply/:jobId', auth, upload.single('resume'), async (req, res) => {
    try {
        const existingApplication = await Application.findOne({
            job: req.params.jobId,
            student: req.user.id,
        });
        if (existingApplication) {
            return res.status(400).json({ msg: 'You have already applied for this job' });
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'No resume file uploaded' });
        }
        const newApplication = new Application({
            job: req.params.jobId,
            student: req.user.id,
            resumePath: req.file.path,
        });
        await newApplication.save();
        res.status(201).json({ msg: 'Application submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;