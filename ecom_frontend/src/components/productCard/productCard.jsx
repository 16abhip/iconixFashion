import { Link } from "react-router-dom";
import "./productCard.css";
const ProductCard = ({ product }) => {
  const { _id, img, price, title } = product;
  return (
    <div className="product">
      <Link to={`/product/singleProduct/${_id}`} key={_id}>
        <div className="image">
          <img src={img[0]} alt="product-img" />
        </div>{" "}
      </Link>
      <div className="detail">
        <div className="namePrice">
          <h5 className="title">{title.toUpperCase()}</h5>
          <div className="price">
            <span className="new-price"> Rs {price[1]}</span>
            <span>
              {price[0] > price[1] && (
                <span>
                  <span className="old-price">Rs.{price[0]} </span>
                  {Math.round(((price[0] - price[1]) / price[0]) * 100)}%{" "}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      {/* <h1>{price[0]}</h1> */}
    </div>
  );
};

export default ProductCard;
