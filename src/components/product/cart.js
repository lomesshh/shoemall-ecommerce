import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import Loader from "../pages/Loader";
import CartCard from "./CartCard";

const Cart = () => {
  const { cartstate, totalAmount, discountAmount, finalAmount } = useCart();

  return (
    <div>
      <div className="cart">
        <div className="cart__heading">
          <i className="fas fa-shopping-cart"></i>
          <h1>My Cart ({cartstate.cart.length})</h1>
        </div>

        {cartstate.loading && <Loader />}

        {!cartstate.cart.length && (
          <div className="empty__message">
            <h1>Your cart is empty !</h1>
          </div>
        )}

        <div className="cart__section">
          <div className="cart__section-items">
            <div className="product__list-grid cart__grid">
              {cartstate.cart.map((item) => (
                <CartCard item={item} key={item._id} />
              ))}
            </div>
          </div>

          {totalAmount !== 0 && (
            <div className="cart__section-bill">
              <h1>Price Details</h1>
              <div>
                <p>Price ({cartstate.cart.length} items)</p>
                <p>₹ {totalAmount}</p>
              </div>
              <div>
                <p>Discount</p>
                <p>- ₹ {discountAmount}</p>
              </div>
              <div>
                <p>Delivery Charge</p>
                <p>+ ₹ {totalAmount === 0 ? 0 : 299}</p>
              </div>
              <div className="totalAmt__div">
                <h2>Total</h2>
                <h2>₹ {finalAmount}</h2>
              </div>
              <Link to="/checkout">
                <button className="placeorder__button">
                  Proceed to payment
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
