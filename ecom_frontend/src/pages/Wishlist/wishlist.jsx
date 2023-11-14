import React, { useState } from "react";
import ProductCard from "../../components/productCard/productCard";
import "./wishlist.css";
import { useEffect } from "react";
import axios from "axios";
import Delete from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
const Wishlist = ({ user, setUser }) => {
  const [wItems, setWItems] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://tiny-blue-oyster.cyclic.app/api/users/getWishlistProduct?id=${user._id}`
      )
      .then((data) => setWItems(data.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="wishlist">
      {wItems.length > 0 ? (
        <>
          <h2>My Wishlist</h2>
          {wItems.length === 0 ? (
            <div className="empty">Your wishlist is empty.</div>
          ) : (
            <div className="container-wishlist">
              {wItems.map((product) => (
                <div key={product.id}>
                  <div className="wishlist-item">
                    <ProductCard product={product} />
                    <Button
                      onClick={async () => {
                        try {
                          const newUser = await axios.delete(
                            `https://tiny-blue-oyster.cyclic.app/api/users/delete?type=wishlist&ph=${user.phone}&id=${product._id}&size=m&price=${product.price[1]}`
                          );
                          setUser(newUser.data);
                        } catch (error) {
                          console.log(user);
                          console.log(product);
                          console.log(error);
                        }
                      }}
                      variant="primary"
                      className="delete-wishlist"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <h2 className="emp-wish">Your wishlist is empty!</h2>
      )}
    </div>
  );
};

export default Wishlist;
