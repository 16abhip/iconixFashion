import React from "react";
import "./profilepage.css"; // Make sure to link the CSS file
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const ProfilePage = ({ user, setUser }) => {
  const [orders, setOrders] = useState({});

  const changePassword = () => {};
  useEffect(() => {
    axios
      .get(
        `https://tiny-blue-oyster.cyclic.app/api/users/orders?userId=${user._id}`
      )
      .then((data) => {
        setOrders(data.data);
      })
      .catch((error) => console.log(error));
    // console.log(orders);
  }, []);

  return (
    <div className="profile-page">
      <h1>Hi {user.name}</h1>
      <div className="profile-info">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone:</strong> {user.phone}
        </div>
      </div>
      {/* <div className="change-password">
        <label

        <Button onClick={changePassword}>Change Password</Button>
      </div> */}
      {orders.length > 0 ? (
        <>
          <h2>Order History</h2>
          {orders.map((item) => (
            <div key={item._id} className="order-item">
              <div key={item.name} className="order-details">
                <div className="product-img-profile-oh">
                  <img src={item.img} alt=" product" />
                </div>
                <div className="oh-details">
                  <div className="item-oh1">
                    <div>
                      <strong>{item.title}</strong>
                    </div>
                  </div>
                  <div className="item-oh2">
                    <div>{Date(item.date).slice(0, 16)}</div>
                    <div>Rs. {item.price}</div>
                    <div>{item.size.toUpperCase()}</div>
                    <div>Qty: {item.qty}</div>
                    <div>Address: {item.address}</div>
                    <div>City: {item.city}</div>
                    <div>Order ID: {item._id}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;
