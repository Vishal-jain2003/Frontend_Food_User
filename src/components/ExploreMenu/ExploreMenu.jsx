import React, { useRef } from 'react';
import { categories } from '../../assets/assets';
import './ExploreMenu.css'; // We will add a few CSS tweaks

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="explore-menu position-relative p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold m-0 animate__animated animate__fadeInDown "> Explore Our Menu </h2>
        <div className="d-flex gap-2">
          <i
            className="bi bi-arrow-left-circle-fill fs-2 text-primary scroll-btn"
            onClick={() => scroll('left')}
          ></i>
          <i
            className="bi bi-arrow-right-circle-fill fs-2 text-primary scroll-btn"
            onClick={() => scroll('right')}
          ></i>
        </div>
      </div>

      <p className="text-secondary mb-4 fs-5">
        Dive into handpicked categories curated just for you
      </p>

      <div
        ref={scrollRef}
        className="d-flex gap-4 overflow-auto pb-2 explore-scrollbar"
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="text-center flex-shrink-0 explore-card"
            style={{ width: 150 }}
            onClick={() => setCategory(prev => prev === item.category ? 'All' : item.category)}
          >
            <img
              src={item.icon}
              alt={item.category}
              height={128}
              width={128}
              className={`rounded-circle shadow ${item.category === category ? 'active-category' : ''}`}
              style={{ objectFit: 'cover' }}
            />
            <p className="mt-2 fw-semibold">{item.category}</p>
          </div>
        ))}
      </div>

      <hr className="mt-4" />
    </div>
  );
};

export default ExploreMenu;
