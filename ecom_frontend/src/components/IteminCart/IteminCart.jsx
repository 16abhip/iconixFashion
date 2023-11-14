import React from "react";
import { getById } from "../../fetchDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import "./iteminCart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const IteminCart = ({ item, user, setUser, sum, setSum }) => {
  const handleIncrement = async () => {
    try {
      const newUser = await axios.post(
        `https://tiny-blue-oyster.cyclic.app/api/users/update?id=${item._id}&ph=${user.phone}&type=inc&size=${item.size}&price=${item.price[1]}`
      );
      console.log("EEEEEEnzcvzvc");
      setUser(newUser.data);
      console.log(newUser.data);
      // setSum(newUser.data.sum);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const newUser = await axios.delete(
        `https://tiny-blue-oyster.cyclic.app/api/users/delete?type=cart&ph=${user.phone}&id=${item._id}&size=${item.size}&price=${item.price[1]}`
      );
      setUser(newUser.data);
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = async () => {
    if (item.qty == 1) {
      handleDelete();
      return;
    }
    try {
      const newUser = await axios.post(
        `https://tiny-blue-oyster.cyclic.app/api/users/update?id=${item._id}&ph=${user.phone}&type=dec&size=${item.size}&price=${item.price[1]}`
      );

      setUser(newUser.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="prod-main">
      <div className="prod-image">
        <Link to={`/product/singleProduct/${item.id}`} key={item.id}>
          <img src={item.img} alt="Product" />
        </Link>
      </div>
      <div className="product-details-cart">
        <div className="details-cart">
          <span className="details-cart-item1">
            <strong> {item.title}</strong>
          </span>
          <div className="details-cart-item2">
            <span>
              Size <span>{item.size.toUpperCase()}</span>
            </span>

            <span>
              Qty <span> {item.qty}</span>
            </span>
          </div>
        </div>
        <div className="btnctn">
          <p className="cart-price">Rs. {item.price[1]}</p>

          <button className="IncDecbutton" onClick={handleDecrement}>
            -
          </button>
          <button className="IncDecbutton" onClick={handleIncrement}>
            +
          </button>
          <DeleteIcon
            onClick={handleDelete}
            sx={{ alignSelf: "center", fontSize: "2rem", cursor: "pointer" }}
            fontSize="inherit"
          />
        </div>
      </div>
    </div>
  );
};

export default IteminCart;
