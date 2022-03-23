import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";
import { Notify } from "../pages/Toast";
import "../stylesheets/cart.css";

const CartCard = ({ item }) => {
  const { cartdispatch, addToCart } = useCart();
  const { state, addToWishlist } = useWishlist();

  const wishlistProdIndex = state.wishlist.findIndex(
    (prod) => prod._id === item._id
  );

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div className="product__list-card">
      <div className="product__card-image">
        <Link to={`/product/${item._id}`}>
          <img src={item.image} alt="product" />
        </Link>
      </div>
      <div className="product__card-info">
        <Link to={`/product/${item._id}`}>
          <h3>
            {item.name.length < 15
              ? item.name
              : item.name.substring(0, 15) + "..."}
          </h3>
        </Link>
        <div className="product__card-heart">
          <Link to={`/product/${item._id}`}>
            <h3>₹ {item.price}</h3>
          </Link>
          <h2>
            <i className="far fa-trash-alt" onClick={() => addToCart(item)}></i>
          </h2>
        </div>
        <div className="wishlist__rating">
          <Link to={`/product/${item._id}`}>
            <h2>
              {average(item.ratings).toFixed(0)}
              <i className="fa-solid fa-star"></i>
            </h2>
          </Link>
        </div>
        <div className="product__quantity">
          <button
            className={`${item.quantity < 2 ? `disabledbutton` : ``}`}
            onClick={() => {
              if (item.quantity > 1) {
                cartdispatch({ type: "DECREMENT_QTY", payload: item });
              }
            }}
          >
            -
          </button>
          <input value={item.quantity} disabled />
          <button
            onClick={() =>
              cartdispatch({ type: "INCREMENT_QTY", payload: item })
            }
          >
            +
          </button>
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
