import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetails.css'

const FoodDetails = () => {
  const { id } = useParams();
  const { foodList, increaseQty } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const foodItem = foodList.find(item => item.id === id);

  if (!foodItem) {
    return (
      <div className="container text-center py-5">
        <h3>Food item not found!</h3>
      </div>
    );
  }

  const { name, description, price, imageUrl, category } = foodItem;

  const addToCart = () => {
    increaseQty(id);
    navigate('/cart');
  };

  return (
    <div className="container py-5">
      {/* Main Section */}
      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <div className="rounded-4 shadow-sm overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="img-fluid w-100"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{name}</h2>
          <span className="badge text-bg-warning text-dark mb-3 px-3 py-2 rounded-pill text-uppercase shadow-sm">
            {category}
          </span>
          <h4 className="text-success fw-bold">&#8377;{price}</h4>
          <p className="text-muted mt-3" style={{ lineHeight: '1.7' }}>
            {description || 'No description available. Enjoy our delicious food made with love and fresh ingredients.'}
          </p>
          <button className="btn btn-primary px-4 py-2 mt-4 shadow-sm" onClick={addToCart}>
            <i className="bi bi-cart-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>

      {/* Related Section */}
      <div className="mt-5 pt-4 border-top">
        <h4 className="mb-4">You may also like</h4>
        <div className="row g-4">
          {
            foodList
              .filter(item => item.id !== id && item.category === category)
              .slice(0, 4)
              .map(item => (
                <div key={item.id} className="col-6 col-md-3">
                  <Link to={`/food/${item.id}`} className="text-decoration-none text-dark">
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        style={{ height: '160px', objectFit: 'cover' }}
                        alt={item.name}
                      />
                      <div className="card-body">
                        <h6 className="card-title fw-semibold mb-1">{item.name}</h6>
                        <p className="text-success fw-bold small">&#8377;{item.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
