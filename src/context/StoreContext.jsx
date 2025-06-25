

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


import { fetchFoodList } from "../services/foodService";
import { removeQtyFromCart, addToCart, getCartData } from "../services/cartService";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate(); 

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  };

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[foodId];
      return newQuantities;
    });
  };

  const loadCartData = async (token) => {
    const items = await getCartData(token);
    setQuantities(items);
  };

  const contextValue = {
    foodList,
    quantities,
    setQuantities,
    increaseQty,
    decreaseQty,
    removeFromCart,
    token,
    setToken,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);

      const localToken = localStorage.getItem("token");

      if (localToken && isTokenValid(localToken)) {
        setToken(localToken);
        await loadCartData(localToken);
      } else {
      
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
      }
    }

    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
