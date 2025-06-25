


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css'

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { quantities, increaseQty, decreaseQty } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 food-card" style={{ width: '100%', maxWidth: '320px' }}>
        <Link to={`/food/${id}`}>
          <div className="overflow-hidden rounded-top-4" style={{ height: '200px' }}>
            <img
              src={imageUrl}
              alt={name}
              className="w-100 h-100 object-fit-cover"
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </div>
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-2">{name}</h5>
          <p className="card-text text-muted small" style={{ height: '48px', overflow: 'hidden' }}>{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bold text-success">&#8377;{price}</span>
            <Link to={`/food/${id}`} className="btn btn-outline-primary btn-sm rounded-pill">View</Link>
          </div>
        </div>
        <div className="card-footer border-0 bg-white d-flex justify-content-center">
          {
            quantities[id] > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-outline-danger btn-sm" onClick={() => decreaseQty(id)}>
                  <i className="bi bi-dash"></i>
                </button>
                <span className="fw-semibold">{quantities[id]}</span>
                <button className="btn btn-outline-success btn-sm" onClick={() => increaseQty(id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => increaseQty(id)}>
                Add to Cart
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
