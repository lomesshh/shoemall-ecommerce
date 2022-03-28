import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFilter } from "../../context/filtercontext";
import "../stylesheets/singleproduct.css";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";
import { useAuth } from "../../context/authcontext";
import Loader from "./../pages/Loader";

const SingleProduct = () => {
  const { productId } = useParams();
  const { allproducts } = useFilter();
  const { state, addToWishlist } = useWishlist();
  const { cartstate, addToCart } = useCart();
  const { localToken } = useAuth();

  const cartProd = cartstate.cart.find((prod) => prod._id === productId);
  const wishlistProd = state.wishlist.find((prod) => prod._id === productId);
  const findItem = allproducts.find((prod) => prod.id === productId);

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const wishlistHandler = () => {
    if (localToken) {
      addToWishlist(findItem);
    } else {
      navigate("/login");
      Notify("Please login first", "warning");
    }
  };

  const cartHandler = () => {
    if (localToken) {
      addToCart(findItem);
    } else {
      navigate("/login");
      Notify("Please login first", "warning");
    }
  };

  return (
    <div>
      {!findItem && (
        <div className="empty__singlepage">
          <Loader />
        </div>
      )}
      {findItem && (
        <div className="singleproduct">
          <div className="singleproduct__image">
            <img src={findItem.image} alt="single-product" />
          </div>

          <div className="singleproduct__info">
            <h1>{findItem.name}</h1>
            <p>
              {average(findItem.ratings).toFixed(0)}{" "}
              <i className="fa-solid fa-star"></i> | {findItem.ratings.length}{" "}
              Ratings
            </p>
            <h2>₹ {findItem.price}</h2>
            <p>{findItem.description}</p>

            <div className="singleproduct__button">
              {!cartProd && <button onClick={cartHandler}>Add to cart</button>}
              {cartProd && (
                <Link to="/cart">
                  <button>go to cart</button>
                </Link>
              )}
              {!wishlistProd && (
                <button onClick={wishlistHandler}>Add to wishlist</button>
              )}
              {wishlistProd && (
                <Link to="/wishlist">
                  <button>go to wishlist</button>
                </Link>
              )}
            </div>
            <button className="share__button">
              <i className="fas fa-share"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
