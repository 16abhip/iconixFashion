import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const { getById } = require("../../fetchDetails");

const ProductDetail = ({ user, setUser }) => {
  const { _id } = useParams();
  const history = useNavigate();
  // const product = getById(_id);
  const [size, setSize] = useState("m");
  const [product, setProduct] = useState({});
  const [isActive, setActive] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://tiny-blue-oyster.cyclic.app/api/products/singleProduct?id=${_id}`
      )
      .then((res) => {
        setProduct(res.data);
        setActive(res.data.img[0]);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleAddtoCart = async () => {
    if (Object.keys(user).length > 0) {
      try {
        const newUser = await axios.post(
          `https://tiny-blue-oyster.cyclic.app/api/users/add?type=cart&ph=${user.phone}&id=${_id}&size=${size}`
        );

        setUser(newUser.data);
        toast.success("Successfully added to cart!");
      } catch (error) {
        toast.error("Error in adding to cart!");
        console.log(error);
      }
    } else {
      history("/login");
    }
  };

  const handleAddtoWishlist = async () => {
    if (Object.keys(user).length > 0) {
      try {
        const newUser = await axios.post(
          `https://tiny-blue-oyster.cyclic.app/api/users/add?type=wishlist&ph=${user.phone}&id=${_id}&size=${size}`
        );

        setUser(newUser.data);
        toast.success("Successfully added to wishlist!");
      } catch (error) {
        toast.error("Error in adding to wishlist!");
        console.log(error);
      }
    } else {
      history("/login");
    }
  };

  return (
    <div className="product-detail">
      {Object.keys(product).length > 0 ? (
        <>
          <div className="product-image">
            <div className="allimages">
              {product.img.map((productImages) => (
                <div
                  key={productImages}
                  onClick={() => setActive(productImages)}
                >
                  <img src={productImages} alt="Product Images" />
                </div>
              ))}
            </div>
            <div className="active-image">
              <img src={isActive} alt="Product" />
            </div>
          </div>
          <div className="product-desc">
            <h3 className="">{product.title.toUpperCase()}</h3>
            Category: {product.type.toUpperCase()} <br />
            Price: Rs.{product.price[0]}{" "}
            <div className="size-selector ">
              <FormControl
                sx={{
                  width: "100%",
                  backgroundColor: "rgb(206, 205, 205)",
                }}
              >
                <InputLabel
                  sx={{ color: "black", fontWeight: "1000px", padding: "0px" }}
                  id="demo-simple-select-label"
                >
                  Size
                </InputLabel>
                <Select
                  sx={{ color: "black" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size}
                  label="Size"
                  onChange={handleSizeChange}
                >
                  <MenuItem value={"xs"}>XS</MenuItem>

                  <MenuItem value={"s"}>S</MenuItem>
                  <MenuItem value={"m"}>M</MenuItem>
                  <MenuItem value={"l"}>L</MenuItem>
                  <MenuItem value={"xl"}>XL</MenuItem>
                  <MenuItem value={"xxl"}>XXL</MenuItem>
                </Select>
              </FormControl>
              <Toaster />
            </div>
            <div className="item">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "black",
                  outlineColor: "black",
                }}
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                style={{ color: "black" }}
                onClick={handleAddtoWishlist}
              >
                Add to Wishlist
              </Button>
            </div>
            <p className="item-description">{product.desc}</p>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default ProductDetail;
