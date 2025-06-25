


import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter(food => (
    (category === 'All' || food.category.toLowerCase() === category.toLowerCase()) &&
    (searchText === '' || food.name.toLowerCase().includes(searchText.toLowerCase()))
  ));

  return (
    <div className="container my-4">
      
      <div className="row g-4">
        {
          filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <FoodItem
                key={index}
                name={food.name}
                description={food.description}
                id={food.id}
                imageUrl={food.imageUrl}
                price={food.price}
              />
            ))
          ) : (
            <div className="text-center mt-5">
              <h4 className="text-muted">No matching food items found.</h4>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
