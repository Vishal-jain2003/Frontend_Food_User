import React, { useContext, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import loginvideo from '../../assets/video/loginvideo.mp4'; // adjust as per your structure
import { loginUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const{setToken , loadCartData} = useContext(StoreContext);
  const[data,setData] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;   
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler =async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., call an API to authenticate the user
    try{
      const res = await loginUser(data);
      if (res.status === 200) {
        setToken(res.data.token); // Assuming the token is returned in res.data.token
        localStorage.setItem('token', res.data.token); // Store token in localStorage
        await loadCartData(res.data.token);
        navigate('/'); // Redirect to home page after successful login
        // toast.success('Login successful!');
      
      } else {
        toast.error('Login failed, please check your credentials.');
      }
    }
    catch(error){
      toast.error('Login failed, please check your credentials.');
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
          {/* <h3 className="text-center fw-bold mb-4 text-dark">Sign In</h3> */}

          <form onSubmit={onSubmitHandler} >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
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
                value={data.password}
                onChange={onChangeHandler}

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
                {showPassword ? '👁️'  : '🙈' }
              </span>
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-success text-uppercase fw-semibold"
                style={btnStyle}
                type="submit"
              >
                Sign In
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
              Don’t have an account?{' '}
              <Link to="/register" className="text-decoration-none fw-semibold text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
