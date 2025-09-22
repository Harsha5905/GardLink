import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './SharedPages.css';
import ApplyForm from './ApplyForm';

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).user.id : null;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();

                const filteredJobs = data.filter(job => job.user._id !== userId);

                setJobs(filteredJobs);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchJobs();
    }, [userId]);

    if (loading) {
        return <div className="shared-page-container">Loading jobs...</div>;
    }

    if (error) {
        return <div className="shared-page-container" style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="shared-page-container">
            <h2>All Job Listings</h2>
            <div className="job-listings-container">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="job-item">
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Experience:</strong> {job.experience}</p>
                            <p><strong>Package:</strong> {job.package}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p className="posted-by">
                                Posted by: {job.user.name}
                            </p>

                            {userType === 'student' && (
                                <button className="apply-button" onClick={() => setSelectedJobId(job._id)}>
                                    Apply
                                </button>
                            )}

                            {selectedJobId === job._id && <ApplyForm jobId={job._id} />}
                        </div>
                    ))
                ) : (
                    <p>No jobs have been posted yet. Be the first to post one!</p>
                )}
            </div>
        </div>
    );
};

export default ViewJobs;