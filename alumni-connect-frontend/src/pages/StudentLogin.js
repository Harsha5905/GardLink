import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AlumniForms.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    try {
      const response = await fetch('http://localhost:5000/api/auth/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', 'student');
        localStorage.setItem('userName', data.user.name);
        navigate('/student-dashboard'); // This is the redirection call
      } else {
        setMsg(data.msg);
      }

    } catch (err) {
      console.error(err);
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {msg && <p className="form-message">{msg}</p>}
      <div className="form-links">
        <Link to="/student-forgot-password">Forgot Password?</Link>
        <br />
        <br />
        <Link to="/student-register">Register Here</Link>
      </div>
    </div>
  );
};

export default StudentLogin;