import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    // const res = await axios.get('http://localhost:8080/api/orders', {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
  <div className="my-orders-container mt-5">
    <div className="card border-0 shadow-lg">
      <div className="card-header bg-warning d-flex justify-content-between align-items-center">
        <h4 className="mb-0 text-dark fw-bold">My Orders</h4>
        <button className="btn btn-outline-dark btn-sm" onClick={fetchOrders}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-hover align-middle text-center m-0">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Total Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-orders text-center">No orders found.</td>
              </tr>
            ) : (
              data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={order.orderedItems[0]?.imageUrl || "https://via.placeholder.com/48"}
                      alt="Food"
                      className="food-img"
                    />
                  </td>
                  <td className="text-start">
                    {order.orderedItems.map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx !== order.orderedItems.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td>&#x20B9;{order.amount.toFixed(2)}</td>
                  <td>{order.orderedItems.length}</td>
                  <td>
                    <span className={`order-status ${order.orderStatus === "pending" ? "pending" : "preparing"}`}>
                      ● {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


};

export default MyOrders;
