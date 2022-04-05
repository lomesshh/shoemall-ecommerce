import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "frontend/components";
import { useAuth, useCart, useWishlist } from "frontend/context";

const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const ProductCard = ({ item }) => {
  const { state, addToWishlist } = useWishlist();
  const { cartstate, addToCart } = useCart();
  const navigate = useNavigate();
  const { localToken } = useAuth();

  //find in cart
  const cartProdIndex = cartstate.cart.findIndex(
    (prod) => prod._id === item._id
  );

  //find in wishlist
  const findItem = state.wishlist.find((prod) => prod._id === item._id);

  const wishlistHandler = () => {
    if (localToken) {
      addToWishlist(item);
    } else {
      navigate("/login");
      Notify("Please login first", "warning");
    }
  };

  const cartHandler = () => {
    if (localToken) {
      addToCart(item);
    } else {
      navigate("/login");
      Notify("Please login first", "warning");
    }
  };

  return (
    <div>
      <div className="product__list-card">
        <div className="product__card-image">
          <img src={item.image} alt="product" />
        </div>
        <div className="product__card-info">
          <Link to={`/product/${item.id}`}>
            <h4>
              {item.name.length < 20
                ? item.name
                : item.name.substring(0, 20) + "..."}
            </h4>
            <p>Category: {item.category}</p>
          </Link>
          <div className="product__card-heart">
            <Link to={`/product/${item.id}`}>
              <h3> ₹ {item.price}</h3>
            </Link>
            <h2>
              <i
                className={`fa-solid fa-heart ${findItem ? `wishlisted` : ``}`}
                onClick={wishlistHandler}
              ></i>
            </h2>
          </div>
          <Link to={`/product/${item.id}`}>
            <div>
              <h3>
                {average(item.ratings).toFixed(0)}
                <i className="fa-solid fa-star"></i>
              </h3>
            </div>
          </Link>
          {cartProdIndex === -1 && (
            <button onClick={cartHandler}>add to cart</button>
          )}
          {cartProdIndex !== -1 && (
            <Link to="/cart">
              <button>go to cart</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
