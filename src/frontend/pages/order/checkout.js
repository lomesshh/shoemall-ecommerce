import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Notify } from "frontend/components";
import { useCart, useAuth, useOrder } from "frontend/context";
import confetti from "canvas-confetti";

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

const Popper = () => {
  var end = Date.now() + 3 * 1000;
  // go Buckeyes!
  var colors = ["#392f5a", "#9583cf"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 40,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 140,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
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
    clearCart,
    setCouponAmt,
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
        Popper();
        clearCart();
        setCouponAmt(0);
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
                    onClick={() => {
                      Notify("Address selected", "info");
                      orderdispatch({
                        type: "DELIVERY_ADDRESS",
                        payload: item,
                      });
                    }}
                  >
                    Select <i className="fa-solid fa-location-dot"></i>
                  </button>
                </div>
              ))}
            </div>

            <Link to="/profile/address">
              <button className="add__address">
                <i className="fa-solid fa-plus "></i> Add Address
              </button>
            </Link>
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
          {orderstate.deliveryAddress.name && (
            <h3>Delivery Address ( Default )</h3>
          )}
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

export { Checkout };
