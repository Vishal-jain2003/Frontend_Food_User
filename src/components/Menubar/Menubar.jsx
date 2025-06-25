import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Menubar.css'; // Your CSS file with updated styles

const Menubar = () => {
  const { quantities , token, setToken,setQuantities} = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(''); // Clear token in context
   setQuantities({});
    navigate('/'); // Redirect to login page
    
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 fixed-top">
      <div className="container-fluid">
        {/* Logo + App Name */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={assets.logo}
            alt="Logo"
            height={45}
            width={45}
            className="rounded-circle"
          />
          <span className="fw-bold fs-4 text-dark">PetPooja</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links and right section */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Centered links */}
          <ul className="navbar-nav mx-auto gap-lg-4">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-medium text-dark active'
                    : 'nav-link fw-medium text-dark'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-medium text-dark active'
                    : 'nav-link fw-medium text-dark'
                }
              >
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/chefai"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-medium text-dark active'
                    : 'nav-link fw-medium text-dark'
                }
              >
                ChefAI
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-medium text-dark active'
                    : 'nav-link fw-medium text-dark'
                }
              >
                Contact
              </NavLink>
            </li>
              
          </ul>

          {/* Right side: Cart and Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart with badge */}
            <div className="position-relative" style={{ cursor: 'pointer' }}>
              <NavLink to="/cart">
                <img src={assets.cart} alt="Cart" height={30} width={30} />
              </NavLink>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.7rem' }}
              >
                {uniqueItemsInCart}
              </span>
            </div>

            {/* Buttons */}
            {
              !token ? 
              <>
                  <button className="btn btn-outline-primary btn-sm px-3 rounded-pill shadow-sm" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-success btn-sm px-3 rounded-pill shadow-sm" onClick={() => navigate('/register')}>
              Sign Up
            </button>
              </>
              :
              <div className='dropdown text-end'>
                <a href='' className='d-block link-body-emphasis text-decoration none dropdown-toggle'
                data-bs-toggle="dropdown" aria-expanded="false">
                   <img src={assets.user2} alt="" height={33} width={33} className='rounded-circle' />
                </a>
             
                 
                
                <ul className='dropdown-menu text-small '>
                  <li className='dropdown-item' onClick={() => navigate('/myorders')}>
                    Orders

                  </li>
                      <li className='dropdown-item' onClick={logout}>
                    Logout
                  </li>
                </ul>
                </div>
            }
        
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
