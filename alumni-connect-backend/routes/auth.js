const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Alumni = require('../models/Alumni');
const Student = require('../models/Student');

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = '1h';

// ALUMNI AUTH ROUTES
router.post('/register', async (req, res) => {
    const { name, email, password, regNo, phone, company, role, passedOutYear } = req.body;
    try {
        let alumni = await Alumni.findOne({ $or: [{ email }, { regNo }] });
        if (alumni) return res.status(400).json({ msg: 'User already exists' });
        alumni = new Alumni({ name, email, password, regNo, phone, company, role, passedOutYear });
        const salt = await bcrypt.genSalt(10);
        alumni.password = await bcrypt.hash(password, salt);
        await alumni.save();
        const payload = { user: { id: alumni.id, name: alumni.name } };
        jwt.sign(payload, jwtSecret, { expiresIn }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { name: alumni.name } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let alumni = await Alumni.findOne({ email });
        if (!alumni) return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, alumni.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: alumni.id, name: alumni.name } };
        jwt.sign(payload, jwtSecret, { expiresIn }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { name: alumni.name } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// STUDENT AUTH ROUTES
router.post('/student-register', async (req, res) => {
    const { name, email, password, regNo, branch, mobile } = req.body;
    try {
        let student = await Student.findOne({ $or: [{ email }, { regNo }] });
        if (student) return res.status(400).json({ msg: 'User already exists' });
        student = new Student({ name, email, password, regNo, branch, mobile });
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);
        await student.save();
        const payload = { user: { id: student.id, name: student.name } };
        jwt.sign(payload, jwtSecret, { expiresIn }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { name: student.name } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/student-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: student.id, name: student.name } };
        jwt.sign(payload, jwtSecret, { expiresIn }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { name: student.name } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;