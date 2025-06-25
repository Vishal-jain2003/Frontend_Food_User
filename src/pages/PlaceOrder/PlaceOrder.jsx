import React from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { useState } from "react";

import "./PlaceOrder.css"; 
import { calculateCartTotals } from "../../util/cartUtils"; 
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';



const PlaceOrder = () => {
  const navigate = useNavigate()


  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    address:'',
    state:'',
    city:'',
    
    zip:''

  });

  const onChangeHandler = (e) => {
   const name = e.target.name;
   const value = e.target.value;
    setData({
      ...data,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // stop reloading the entire page
    const orderData = {
      userAddress:`${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber:data.phoneNumber,
      email:data.email,
      orderedItems: cartItems.map(item => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
      
      };

      try{
      //  const res = await axios.post('http://localhost:8080/api/orders/create', 
      const res =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/create`, 

        orderData,{headers: { 'Authorization': `Bearer ${token}` }});
       if ( res.status === 201 && res.data.razorpayOrderId)
       {
         // initiate the payment
         
         initiateRazorpayPayment(res.data);
       }
       else{
        toast.error("Something went wrong while placing the order. Please try again later.");
       }
      }
      catch(error){
        
        toast.error("Unable to Create Order.");
      }
    };

    const initiateRazorpayPayment = (order) => {
      console.log("inititate par");
      const options = {
       
        key : import.meta.env.VITE_RAZORPAY_KEY,
        
        amount:order.amount,
        currency: "INR",
        name: "Vishal Jain's AI Powered Food Ordering Website",
        description: "Food order Payment",
        order_id: order.razorpayOrderId,
        handler:async function(response){
          
          await verifyPayment(response);  // api for verification 

        },
        prefill: {
          name:`${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phoneNumber
        },
        theme: {color:"#3399cc"},
        modal: {
          ondismiss:async function () {
            toast.error("Payment cancelled.");
           await deleteOrder(order.id);            // api for delete order
          },
        },

      };
      const rzp = new window.Razorpay(options);

      rzp.open();
     

    }
    const verifyPayment =async (razorpayResponse) => {
      console.log("ab lagbag verify")
      const paymentData = {
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature
      };
    try{
      
      // const res =  await axios.post('http://localhost:8080/api/orders/verify',
        const res =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/verify`, 
        paymentData,{headers: {'Authorization':`Bearer ${token}`}});
    if (res.status === 200)
    {
      toast.success('Payment Successful.');
     await clearCart();
     navigate('/myorders');

    }
    else{
      toast.error('Payment Failed. Please Try Again');
      navigate('/');
    }

    }
    catch(error){
          toast.error('Payment Failed. Please Try Again');
          
    }

    }

    const deleteOrder =async () => {
      try{
        
          //  await axios.delete('http://localhost:8080/api/orders/'
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/orders/`
              +orderId,{headers:{'Authorization':`Bearer ${token}`}});


      }
      catch(error)
      {
        toast.error('Something went Wrong . Contact Support.');
      }

    }

    const clearCart = async () => {
      try{
        // await axios.delete('http://localhost:8080/api/cart'
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/cart`
         ,{headers : {'Authorization' :`Bearer ${token}`}});
        setQuantities({})
      }
      catch(error){
          toast.error('Error While Clearing The cart.')
      }
    }




        
const {foodList,quantities,setQuantities,token} = useContext(StoreContext);
 const cartItems = foodList.filter(food => quantities[food.id]>0);

  // calculation
  const {subtotal,shipping,tax,total} = calculateCartTotals(cartItems, quantities);
  
  return (
    <div className="container mt-2">
      

      
        <main>
           <div className="py-5 text-center"> <img className="rounded-circle mx-auto mb-4" src={assets.logo} alt="" width="98" height="98"/>  </div>
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
              </h4>

              <ul className="list-group mb-3">
               {
                cartItems.map(item=>(
                   <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-body-secondary">&#8377;{item.price*quantities[item.id]}</span>
                </li>
                ))
               }
                <li className="list-group-item d-flex justify-content-between ">
                  <div>
                    
                    <span >Shipping</span>
                  </div>
                  <span className="text-body-secondary">&#8377;{subtotal===0 ? 0.0:shipping.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                  
                    <span >Tax</span>
                  </div>
                  <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                  
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (INR)</span>
                  <strong>&#8377;{total.toFixed(2)}</strong>
                </li>
              </ul>

             
            </div>

            {/* Billing Form */}
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" onSubmit={onSubmitHandler} >
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={data.firstName} onChange={onChangeHandler} required />
                    
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={data.lastName} onChange={onChangeHandler} required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="email" className="form-control" id="email" placeholder="Email" name="email" value={data.email} onChange={onChangeHandler} required />
                    </div>
                  </div>

                    <div className="col-12">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phone" placeholder="99999xxxxx" name="phoneNumber" value={data.phoneNumber} onChange={onChangeHandler} required />
                  </div>

                 
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={data.address} onChange={onChangeHandler} required />
                  </div>
                
                 
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state" name="state" value={data.state} onChange={onChangeHandler} required>
                      <option value="">Choose...</option>
                      <option>Madhya Pradesh</option>
                      <option>Karnataka</option>
                      <option>Uttar Pradesh</option>
                      <option>Andhra Pradesh</option>
                      <option>Uttarakhand</option>

                    </select>
                  </div>

                   <div className="col-md-5">
                    <label htmlFor="country" className="form-label">City</label>
                    <select className="form-select" id="city" name="city" value={data.city} onChange={onChangeHandler} required>
                      <option value="">Choose...</option>
                      <option>Bhind</option>
                      <option>Indore</option>
                      <option>Gwalior</option>
                      <option>Bhopal</option>
                      <option>Ujjain</option>
                      <option>Jabalpur</option>
                      <option>Bangalore</option>
                      <option>Mysore</option>
                      <option>Lucknow</option>
                      <option>Kanpur</option>
                      <option>Hyderabad</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" name="zip" value={data.zip} onChange={onChangeHandler} required />
                  </div>
                </div>

                <hr className="my-4" />

                

               
                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length===0}>Continue to checkout</button>
              </form>
            </div>
        </div>
        </main>
      
    </div>
    
  );
};

export default PlaceOrder;
