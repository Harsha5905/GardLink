import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AlumniForms.css';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    password: '',
    branch: '',
    mobile: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(formData); // Check this in your browser's console
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/student-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setMsg(data.msg);

      if (response.status === 201) {
        // Clear form fields by resetting the state
        setFormData({
            name: '',
            regNo: '',
            email: '',
            password: '',
            branch: '',
            mobile: ''
        });

        setTimeout(() => {
          navigate('/student-login');
        }, 2000);
      }

    } catch (err) {
      console.error(err);
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="regNo">Registration No.:</label>
          <input type="text" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {msg && <p className="form-message">{msg}</p>}
      <div className="form-links">
        <Link to="/student-login">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default StudentRegister;