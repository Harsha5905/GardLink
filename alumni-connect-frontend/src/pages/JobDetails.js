import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplyForm from './ApplyForm';
import './SharedPages.css';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJob(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    if (loading) {
        return <div className="shared-page-container">Loading job details...</div>;
    }

    if (error) {
        return <div className="shared-page-container" style={{ color: 'red' }}>Error: {error}</div>;
    }
    
    return (
        <div className="job-details-container">
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Package:</strong> {job.package}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p className="posted-by">
                Posted by: {job.user.name} ({job.user.email})
            </p>
            <ApplyForm jobId={job._id} />
        </div>
    );
};

export default JobDetails;