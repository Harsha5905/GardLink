// src/pages/ApplyForm.js

import React, { useState } from 'react';
import './AlumniForms.css';

const ApplyForm = ({ jobId }) => {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const token = localStorage.getItem('token');
        if (!token) {
            setMsg('You must be logged in to apply.');
            return;
        }

        if (!file) {
            setMsg('Please select a resume file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch(`http://localhost:5000/api/jobs/apply/${jobId}`, {
                method: 'POST',
                headers: {
                    'x-auth-token': token
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setMsg('Application submitted successfully!');
                setFile(null); // Clear the file input
            } else {
                setMsg(data.msg || 'Failed to submit application.');
            }
        } catch (err) {
            console.error(err);
            setMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="apply-form-container">
            <h4>Apply for this job</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="resume">Upload Resume (PDF only):</label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                    />
                </div>
                <button type="submit">Submit Application</button>
            </form>
            {msg && <p className="form-message">{msg}</p>}
        </div>
    );
};

export default ApplyForm;