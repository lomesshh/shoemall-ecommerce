import React from "react";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";
import { Notify } from "../pages/Toast";
import { Link } from "react-router-dom";

const WishlistCard = ({ item }) => {
  const { addToWishlist } = useWishlist();
  const { cartstate, addToCart } = useCart();

  const cartProdIndex = cartstate.cart.findIndex(
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
          <h3>{item.name.substring(0, 15) + "..."}</h3>
          <p>Category: {item.category}</p>
          <p className="wishlist__desc">
            {item.description.substring(0, 45) + "....."}
          </p>
          <div className="wishlist__rating">
            <h2>
              {average(item.ratings).toFixed(0)}
              <i className="fa-solid fa-star"></i>
            </h2>
          </div>
        </Link>

        <div className="product__card-heart">
          <Link to={`/product/${item.id}`}>
            <h3>₹ {item.price}</h3>
          </Link>
          <h2>
            <i className="fas fa-heart" onClick={() => addToWishlist(item)}></i>
          </h2>
        </div>

        {cartProdIndex === -1 && (
          <button onClick={() => addToCart(item)}>move to cart</button>
        )}
        {cartProdIndex !== -1 && (
          <button
            className="disabledbutton"
            onClick={() => Notify("Alredy in cart", "warning")}
          >
            already in cart
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
