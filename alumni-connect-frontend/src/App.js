import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AlumniLogin from './pages/AlumniLogin';
import StudentLogin from './pages/StudentLogin';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Feedback from './pages/Feedback';
import AlumniRegister from './pages/AlumniRegister';
import StudentRegister from './pages/StudentRegister';
import AlumniDashboard from './pages/AlumniDashboard';
import StudentDashboard from './pages/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import JobDetails from './pages/JobDetails'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alumni-login" element={<AlumniLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/alumni-register" element={<AlumniRegister />} />
            <Route path="/student-register" element={<StudentRegister />} />
            
            {/* These are the protected routes */}
            <Route path="/alumni-dashboard" element={<PrivateRoute userType="alumni"><AlumniDashboard /></PrivateRoute>} />
            <Route path="/student-dashboard" element={<PrivateRoute userType="student"><StudentDashboard /></PrivateRoute>} />
            <Route path="/jobs/:jobId" element={<PrivateRoute userType="student"><JobDetails /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;