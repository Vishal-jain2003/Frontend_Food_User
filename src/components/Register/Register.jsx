import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginvideo from '../../assets/video/loginvideo.mp4'; // adjust as needed
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import for toast notifications
import { registerUser } from '../../services/authService';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
 const navigate = useNavigate();
  const[data,setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const onSubmitHandler =async (e) => {
    e.preventDefault();
    try {
    const res = await registerUser(data);
     if (res.status === 201) {
     toast.success('Registration successful! Please login.');
     navigate('/login'); // Redirect to login page after successful registration

     }
     else 
     {
      toast.error('Registration failed, please try again.');
     }
    }
    catch(error){
      toast.error('Registration failed, please try again.');
    }
    
  };

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    zIndex: -1,
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    maxWidth: '440px',
    width: '100%',
    borderRadius: '1rem',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
  };

  const btnStyle = {
    fontSize: '0.95rem',
    letterSpacing: '0.05rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.3rem',
  };

  const labelStyle = {
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src={loginvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     

      <div style={overlayStyle}>
        <div style={cardStyle}>
          {/* <h3 className="text-center fw-bold mb-4 text-dark">Sign Up</h3> */}

          <form onSubmit={onSubmitHandler} >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Your Name"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                required
              />
              <label htmlFor="nameInput" style={labelStyle}>Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                
                required
              />
              <label htmlFor="emailInput" style={labelStyle}>Email address</label>
            </div>

            <div className="form-floating mb-4 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                required
              />
              <label htmlFor="passwordInput" style={labelStyle}>Password</label>

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#555',
                }}
              >
                {showPassword ? '👁️'  : '🙈'}
              </span>
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-success text-uppercase fw-semibold"
                style={btnStyle}
                type="submit"
              >
                Sign Up
              </button>
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-danger text-uppercase fw-semibold"
                style={btnStyle}
                type="reset"
              >
                Reset
              </button>
            </div>

            <p className="text-center text-muted mt-3 mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
