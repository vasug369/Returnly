require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Waitlist Submission Route
app.post('/api/v1/waitlist', async (req, res) => {
    try {
        const { fullName, email, jobCity, hometown, travelFrequency } = req.body;

        if (!fullName || !email || !jobCity || !hometown || !travelFrequency) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const query = `
            INSERT INTO waitlist_submissions 
            (full_name, email, job_city, hometown, travel_frequency) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [fullName, email, jobCity, hometown, travelFrequency]);
        res.status(201).json({ message: 'Successfully joined waitlist!', id: result.insertId });
    } catch (error) {
        console.error('Database error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already registered on the waitlist.' });
        }
        res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
});

// Admin Route to get submissions
app.get('/api/v1/admin/submissions', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM waitlist_submissions ORDER BY created_at DESC');
        res.status(200).json({ total: rows.length, submissions: rows });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
