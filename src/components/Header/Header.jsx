import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 mt-1 header">
      <div className="overlay" />
      <div className="container-fluid py-5 content">
        <h1 className="display-5 fw-bold animate-slide-in">
          Order Your Favourite Food here
        </h1>
        <p className="col-md-8 fs-4 animate-fade-in animate__animated animate__fadeInDown">
          Tasty, fresh, and fast—your next meal is just a scroll away!
        </p>
        <Link to="/explore" className="btn btn-warning btn-lg animate-fade-in">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Header;
