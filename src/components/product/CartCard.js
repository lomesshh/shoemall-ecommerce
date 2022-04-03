import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";
import { Notify } from "../pages/Toast";
import "../stylesheets/cart.css";

const CartCard = ({ item }) => {
  const { decrementQty, addToCart, incrementQty } = useCart();
  const { state, addToWishlist } = useWishlist();

  const wishlistProdIndex = state.wishlist.findIndex(
    (prod) => prod._id === item._id
  );

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div className="product__list-card">
      <div className="product__card-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt="product" />
        </Link>
      </div>
      <div className="product__card-info">
        <Link to={`/product/${item.id}`}>
          <h3>
            {item.name.length < 15
              ? item.name
              : item.name.substring(0, 15) + "..."}
          </h3>
        </Link>
        <div className="product__card-heart">
          <Link to={`/product/${item.id}`}>
            <h3>₹ {item.price}</h3>
          </Link>
          <h2>
            <i className="far fa-trash-alt" onClick={() => addToCart(item)}></i>
          </h2>
        </div>
        <div className="wishlist__rating">
          <Link to={`/product/${item.id}`}>
            <h2>
              {average(item.ratings).toFixed(0)}
              <i className="fa-solid fa-star"></i>
            </h2>
          </Link>
        </div>
        <div className="product__quantity">
          <button
            className={`${item.qty < 2 ? `disabledbutton` : ``}`}
            onClick={() => {
              if (item.qty > 1) {
                decrementQty(item);
              }
            }}
          >
            -
          </button>
          <input value={item.qty} disabled />
          <button onClick={() => incrementQty(item)}>+</button>
        </div>
        {wishlistProdIndex === -1 && (
          <button onClick={() => addToWishlist(item)}>move to wishlist</button>
        )}
        {wishlistProdIndex !== -1 && (
          <button
            className="disabledbutton"
            onClick={() => Notify("Alredy in wishlist", "warning")}
          >
            already in wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default CartCard;
