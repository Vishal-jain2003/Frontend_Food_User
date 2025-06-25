import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const categories = [
  'All', 'Jain Thali', 'Cake', 'Pizza', 'Burger',
  'Pasta', 'Salad', 'Sushi', 'Sandwich', 'Dessert', 'Beverage'
];

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
      {/* Heading */}
      <h2 className="text-center mb-4 fw-bold animate__animated animate__fadeInDown">
        <span role="img" aria-label="plate"></span> Explore Delicious Foods
      </h2>

      {/* 🔍 Sticky Search Bar */}
      <div style={{ position: 'sticky', top: '80px', zIndex: 10, backgroundColor: '#fff', paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="row justify-content-center mb-3">
          <div className="col-md-8 col-lg-6">
            <form
              className="d-flex flex-wrap gap-2 justify-content-center bg-white border rounded-pill shadow-sm px-3 py-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="form-control border-0"
                style={{ maxWidth: '280px', borderRadius: '20px' }}
                placeholder="🔍 Search your favorite food..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <button className="btn btn-primary rounded-pill px-3" type="submit">
                <i className="bi bi-search me-1"></i> Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm rounded-pill px-3 fw-medium ${category === cat ? 'btn-dark text-white' : 'btn-outline-dark'}`}
            onClick={() => setCategory(cat)}
            style={{
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              boxShadow: category === cat ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Items Display */}
      <FoodDisplay category={category} searchText={searchText} />
    </div>
  );
};

export default ExploreFood;
