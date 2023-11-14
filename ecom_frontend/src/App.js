import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/layout";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/wishlist";
import Shop from "./pages/Shop/Shop";
import ProductDetail from "./components/productDetails/productDetails";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import "./App.css";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Signup from "./pages/Signup/Signup";
import Checkout from "./pages/Checkout/Checkout";
function App() {
  const [productData, setProductData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("https://tiny-blue-oyster.cyclic.app/api/products")
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <div>
        <Layout productData={productData} setProductData={setProductData}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  productData={productData}
                  setProductData={setProductData}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <Shop
                  productData={productData}
                  setProductData={setProductData}
                />
              }
            />

            <Route
              path="/wishlist"
              element={<Wishlist user={user} setUser={setUser} />}
            />
            <Route
              path="/product/singleProduct/:_id"
              element={<ProductDetail user={user} setUser={setUser} />}
            />
            <Route
              path="/about"
              element={
                <About
                  productData={productData}
                  setProductData={setProductData}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />

            <Route
              path="/checkout"
              element={<Checkout user={user} setUser={setUser} />}
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
