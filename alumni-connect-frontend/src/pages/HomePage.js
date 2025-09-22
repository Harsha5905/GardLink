import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const HomePage = () => {
  return (
    <div>
      <div className="hero-section">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="title">
            Grand Link
          </motion.h1>
          <motion.p variants={itemVariants} className="subtitle">
            Connecting Alumni and Students from our College
          </motion.p>
          <motion.div variants={itemVariants} className="cta-buttons">
            <Link to="/alumni-login">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Alumni
              </motion.button>
            </Link>
            <Link to="/student-login">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Student
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="content-section about-section">
        <h2 className="section-title">About Grand Link</h2>
        <p>
          Grand Link is a dedicated platform designed to bridge the gap between alumni and current students of the same college. Our mission is to create a powerful network where experienced professionals can offer job references, career advice, and mentorship to help students kickstart their careers.
        </p>
      </div>

      <div className="content-section features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>1. Alumni Postings</h3>
            <p>Alumni can share job references, internship opportunities, or mentorship programs directly with the college community.</p>
          </div>
          <div className="feature-item">
            <h3>2. Students Apply</h3>
            <p>Students can browse and apply for jobs and internships posted exclusively for their college network.</p>
          </div>
          <div className="feature-item">
            <h3>3. Connect and Grow</h3>
            <p>Build valuable connections, get expert advice, and find the perfect opportunity to launch your career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;