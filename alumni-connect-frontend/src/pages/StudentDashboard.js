import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewJobs from './ViewJobs';
import './Dashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        navigate('/'); // Redirects to the homepage
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Welcome, {userName}!</h2>
                <div className="dashboard-nav">
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </header>
            
            <div className="dashboard-body">
                <ViewJobs />
            </div>
        </div>
    );
};

export default StudentDashboard;