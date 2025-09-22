import React, { useState } from 'react';
import PostJob from './PostJob';
import ViewJobs from './ViewJobs';
import ViewApplications from './ViewApplications';
import MyJobs from './MyJobs'; // Import the new component
import './Dashboard.css';

const AlumniDashboard = () => {
    const [activeView, setActiveView] = useState('jobs');
    const userName = localStorage.getItem('userName');

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Welcome, {userName}!</h2>
                <div className="dashboard-nav">
                    <button onClick={() => setActiveView('post')} className="dashboard-button">
                        Post a Job
                    </button>
                    <button onClick={() => setActiveView('my-jobs')} className="dashboard-button">
                        View My Jobs
                    </button>
                    <button onClick={() => setActiveView('applications')} className="dashboard-button">
                        View Applications
                    </button>
                    <button onClick={() => setActiveView('jobs')} className="dashboard-button">
                        View All Jobs
                    </button>
                </div>
            </header>
            
            <div className="dashboard-body">
                {activeView === 'post' && <PostJob />}
                {activeView === 'my-jobs' && <MyJobs />}
                {activeView === 'applications' && <ViewApplications />}
                {activeView === 'jobs' && <ViewJobs />}
            </div>
        </div>
    );
};

export default AlumniDashboard;