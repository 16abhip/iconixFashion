import React, { useState } from "react";
import "./header.css";
import logo from "../../assets/logo.svg";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

const Header = ({ setProductData, productData }) => {
  const [isMenu, setIsMenu] = useState(0);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      let term = e.target.value;
      if (term.length > 0) {
        term = encodeURIComponent(term);
        const { data } = await axios.get(
          `https://tiny-blue-oyster.cyclic.app/api/products/search?term=${term}`
        );
        if (data.length > 0) {
          setProductData(data);

          console.log(data);
          navigate("/shop");
        }
      }
    }
  };
  return (
    <div className="navbar-our">
      <div className="first">
        <Link to="/">
          <img src={logo} height="150px" width="150px" alt="Iconix Fashion" />
        </Link>
        {isMenu == 1 && (
          <div className="tohide">
            <Link to="/shop">
              <TextField
                id="standard-search"
                label="Search"
                type="search"
                variant="standard"
                onKeyDown={handleSearch}
              />
            </Link>
            <Link to="/">
              <span>HOME</span>
            </Link>
            <Link to="/shop">
              <span>SHOP</span>
            </Link>

            <Link to="/wishlist">
              <span>
                <FavoriteBorderIcon />
              </span>
            </Link>
            <Link to="/cart">
              <span>
                <ShoppingCartIcon />
              </span>
            </Link>
            <a
              target="_blank"
              href="https://www.instagram.com/iconix.fashion?igshid=MzRlODBiNWFlZA%3D%3D"
              rel="noreferrer"
            >
              <span>
                <InstagramIcon />
              </span>
            </a>
            <Link to="/login">
              <span>
                <AccountCircleIcon />
              </span>
            </Link>
          </div>
        )}
      </div>

      <div className="second">
        <TextField
          fullWidth
          id="standard-search"
          label="Search"
          // type="search "
          onKeyDown={handleSearch}
          variant="filled"
          // focused
          sx={{ width: "50vw" }}
        ></TextField>
      </div>
      <div className="third">
        <Link to="/">
          <span>HOME</span>
        </Link>
        <Link to="/shop">
          <span>SHOP</span>
        </Link>

        <Link to="/wishlist">
          <span>
            <FavoriteBorderIcon />
          </span>
        </Link>
        <Link to="/cart">
          <span>
            <ShoppingCartIcon />
          </span>
        </Link>
        <a
          target="_blank"
          href="https://www.instagram.com/iconix.fashion?igshid=MzRlODBiNWFlZA%3D%3D"
          rel="noreferrer"
        >
          <span>
            <InstagramIcon />
          </span>
        </a>
        <Link to="/login">
          <span>
            <AccountCircleIcon />
          </span>
        </Link>
      </div>
      <div className="burger">
        <MenuIcon
          onClick={() => setIsMenu(!isMenu)}
          sx={{ fontSize: "35px" }}
        />
      </div>
    </div>
  );
};

export default Header;
