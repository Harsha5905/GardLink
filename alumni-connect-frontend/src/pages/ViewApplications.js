import React, { useState, useEffect } from 'react';
import './Applications.css';

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs/my-applications', {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                setApplications(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (token) {
            fetchApplications();
        } else {
            setLoading(false);
            setError('Please log in to view applications.');
        }
    }, [token]);

    if (loading) {
        return <div className="applications-container">Loading applications...</div>;
    }

    if (error) {
        return <div className="applications-container" style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="applications-container">
            <h2>Applications for Your Jobs</h2>
            <div className="applications-list">
                {applications.length > 0 ? (
                    applications.map(app => (
                        <div key={app._id} className="application-item">
                            <h3>Job: {app.job?.title} ({app.job?.company})</h3>
                            <p><strong>Applicant Name:</strong> {app.student?.name}</p>
                            <p><strong>Applicant Email:</strong> {app.student?.email}</p>
                            <p><strong>Branch:</strong> {app.student?.branch}</p>
                            <p><strong>Mobile:</strong> {app.student?.mobile}</p>
                            <a href={`http://localhost:5000/${app.resumePath}`} target="_blank" rel="noopener noreferrer" className="resume-link">
                                View Resume
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No students have applied for your jobs yet.</p>
                )}
            </div>
        </div>
    );
};

export default ViewApplications;