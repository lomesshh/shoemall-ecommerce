import React, { useState } from "react";
import { useCart } from "../../context/cartcontext";
import { Notify } from "../pages/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { useOrder } from "../../context/ordercontext";

// loading razorpay script
const loadScript = async (url) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const {
    cartstate,
    cartdispatch,
    discountAmount,
    finalAmount,
    coupon,
    setCoupon,
    applyCoupon,
    couponAmt,
  } = useCart();
  const { localUser } = useAuth();
  const { address, setAddress, orderdispatch, orderstate } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/checkout" && !finalAmount) {
    navigate("/productslist");
  }

  // sending data to razorpay dynamically
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      Notify("Razorpay SDK failed to load, check you connection", "error");
      return;
    }

    const options = {
      key: "rzp_test_m6yRXv3WmJReRW",
      amount: finalAmount * 100,
      currency: "INR",
      name: "Shoemall",
      description: "Thank you for shopping with us",
      image:
        "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647589272/shoemall/logo1_utxkw6.png",
      handler: function (response) {
        const tempObj = {
          products: [...cartstate.cart],
          amount: finalAmount,
          paymentId: response.razorpay_payment_id,
          delivery: orderstate.deliveryAddress,
        };
        orderdispatch({ type: "ADD_ORDERS", payload: tempObj });
        Notify("Your Payment is successfull !", "success");
        navigate("/profile/orders");
      },
      prefill: {
        name: localUser.name,
        email: localUser.email,
        contact: "9833445762",
      },
      notes: {
        address: orderstate.deliveryAddress.address,
      },
      theme: {
        color: "#392F5A",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cart">
      <div className="cart__heading">
        <i className="fas fa-shopping-bag"></i>
        <h1>Checkout</h1>
      </div>

      <div className="cart__section checkout__section">
        <div className="cart__section-items">
          <div className="product__list-grid checkout__flex">
            {orderstate.address.length > 0 && <h1>All Address</h1>}

            <div className="address__card--flex">
              {orderstate.address.map((item, index) => (
                <div className="address__card" key={index + 1}>
                  <p>Name : {item.name}</p>
                  <p>Email : {item.email}</p>
                  <p>
                    Address : {item.address}, {item.city}, Pin-code :
                    {item.zipcode}
                  </p>
                  <p>State : {item.state}</p>
                  <button
                    className="select__address-button"
                    onClick={() =>
                      orderdispatch({ type: "DELIVERY_ADDRESS", payload: item })
                    }
                  >
                    Select <i className="fa-solid fa-location-dot"></i>
                  </button>
                </div>
              ))}
            </div>

            <h1>Add Shipping Information</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                orderdispatch({ type: "ADD_ADDRESS", payload: address });
                setAddress({
                  ...address,
                  address: "",
                  state: "",
                  city: "",
                  zipcode: "",
                });
                Notify("Address added successfully !", "success");
              }}
            >
              <div className="shipping__info">
                <div className="shipping__info-left">
                  <p>Full Name</p>
                  <input
                    type="text"
                    value={localUser.name}
                    placeholder="Enter full name"
                    disabled
                  />
                  <p>Email Address</p>
                  <input
                    type="email"
                    value={localUser.email}
                    placeholder="Enter email address"
                    disabled
                  />
                  <p>Address</p>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={address.address}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="shipping__info-right">
                  <p>State</p>
                  <input
                    type="text"
                    placeholder="Enter state name"
                    value={address.state}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, state: e.target.value }))
                    }
                    required
                  />
                  <p>City</p>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={address.city}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, city: e.target.value }))
                    }
                    required
                  />
                  <p>ZIP Code</p>
                  <input
                    type="text"
                    pattern="\d*"
                    placeholder="Enter zip code"
                    value={address.zipcode}
                    maxLength="6"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        zipcode: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="Address__button">
                <button type="submit">Add Address</button>
              </div>
            </form>
          </div>
        </div>

        <div className="cart__section-bill">
          <h3>Apply Coupon</h3>
          <div className="apply__coupon">
            <input
              type="text"
              placeholder="Type coupon code here"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={() => {
                applyCoupon();
                setCoupon("");
              }}
            >
              Apply
            </button>
          </div>
          <div className="coupon__offer">
            <h4>Apply NEOGCAMP and get FLAT ₹300 off</h4>
            <h4>Apply SHOEMALL200 and get FLAT ₹200 off</h4>
          </div>
          <h1>Order Summary</h1>
          {cartstate.cart.map((item) => (
            <div>
              <p>
                {item.name.substring(0, 15) + "..."} x {item.qty}
              </p>
              <p>₹ {item.price * item.qty}</p>
            </div>
          ))}
          <div className="discount__div">
            <p>Discount</p>
            <p>- ₹ {discountAmount}</p>
          </div>
          <div>
            <p>Delivery Charge</p>
            <p>+ ₹ 299</p>
          </div>
          {couponAmt > 0 && (
            <div className="coupon__amt">
              <p>Coupon Discount</p>
              <p>- ₹ {couponAmt}</p>
            </div>
          )}
          <div className="totalAmt__div">
            <h2>Total Amount</h2>
            <h2>₹ {finalAmount}</h2>
          </div>
          {orderstate.deliveryAddress.name && <h3>Delivery Address</h3>}
          {orderstate.deliveryAddress.name && (
            <div className="delivery__address">
              <p>Name : {orderstate.deliveryAddress.name}</p>
              <p>Email : {orderstate.deliveryAddress.email}</p>
              <p>
                Address : {orderstate.deliveryAddress.address},
                {orderstate.deliveryAddress.city}, Pin-code :
                {orderstate.deliveryAddress.zipcode}
              </p>
              <p>State : {orderstate.deliveryAddress.state}</p>
            </div>
          )}
          <div className="Payment__button">
            <button
              onClick={() => {
                orderstate.deliveryAddress.name
                  ? displayRazorpay()
                  : Notify("Select Address first", "warning");
              }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
