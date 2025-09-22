import React, { useState, useEffect, useCallback } from 'react';
import './SharedPages.css';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const fetchMyJobs = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/jobs/my-jobs', {
                headers: {
                    'x-auth-token': token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchMyJobs();
        } else {
            setLoading(false);
            setError('You must be logged in to view your jobs.');
        }
    }, [token, fetchMyJobs]);

    const handleDelete = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token,
                },
            });

            if (response.ok) {
                // Refetch the jobs to update the UI
                fetchMyJobs();
                console.log('Job deleted successfully');
            } else {
                console.error('Failed to delete job');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="shared-page-container">Loading jobs...</div>;
    }

    if (error) {
        return <div className="shared-page-container" style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="shared-page-container">
            <h2>My Job Postings</h2>
            <div className="job-listings-container">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className="job-item">
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Experience:</strong> {job.experience}</p>
                            <p><strong>Package:</strong> {job.package}</p>
                            <button onClick={() => handleDelete(job._id)} className="delete-button">
                                Delete Post
                            </button>
                        </div>
                    ))
                ) : (
                    <p>You have not posted any jobs yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyJobs;