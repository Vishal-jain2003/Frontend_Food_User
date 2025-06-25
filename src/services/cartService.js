import axios from 'axios'

// const API_URL = "http://localhost:8080/api/cart"
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/cart`;


export const addToCart = async (foodId,token) => {
  try{
   await axios.post(API_URL,{foodId},{headers:{"Authorization":`Bearer ${token}`}});
  }
  catch(error){
    console.error('Error While adding the Cart Data',error);
    
  }

}

export const removeQtyFromCart  = async (foodId,token) => {
  try{
    await axios.post(`${API_URL}/remove`,{foodId},{headers:{"Authorization":`Bearer ${token}`}});
  }
  catch(error){
    console.error('Error While Removing the Qty from  Cart ',error);

  }

}

export const getCartData = async (token) => {
  try{
   const res =   await axios.get(API_URL,{headers:{"Authorization":`Bearer ${token}`}})

return res.data.items;
  }
  catch(error){
    console.error('Error While Fetching the Cart Data',error);
  }
}