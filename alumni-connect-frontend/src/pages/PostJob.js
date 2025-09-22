import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlumniForms.css';

const PostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        description: '',
        experience: '',
        package: ''
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');

        const token = localStorage.getItem('token');
        if (!token) {
            setMsg('You must be logged in to post a job.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMsg('Job posted successfully!');
                
                // Clear the form fields
                setFormData({
                    company: '',
                    title: '',
                    location: '',
                    description: '',
                    experience: '',
                    package: ''
                });

                // Redirect after a short delay to show the message
                setTimeout(() => {
                    navigate('/alumni-dashboard');
                }, 2000);
            } else {
                setMsg(data.msg || 'Failed to post job.');
            }
        } catch (err) {
            console.error(err);
            setMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Job Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Experience Required:</label>
                    <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="package">Salary Package:</label>
                    <input type="text" id="package" name="package" value={formData.package} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Job Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
                </div>
                <button type="submit">Post Job</button>
            </form>
            {msg && <p className="form-message">{msg}</p>}
        </div>
    );
};

export default PostJob;