import axios from "axios";

// const API_URL = "http://localhost:8080/api/foods";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/foods`;

export const fetchFoodList = async()=>{
  try{
      const res = await axios.get(API_URL);
      return res.data;
  }
  catch(error)
  {
    console.error('Error fetching food list:', error);
    throw error;
  }

  // return res.data;
}