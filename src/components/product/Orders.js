import React, { useEffect } from "react";
import { useOrder } from "../../context/ordercontext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orderstate } = useOrder();

  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div>
      <div className="all__orders">
        <h1>All orders</h1>
        {orderstate.orders.length < 1 && (
          <h4 className="empty__order">No orders found !</h4>
        )}
        <div className="order__list">
          {orderstate.orders.map((item) => (
            <div key={item.paymentId} className="order__main">
              <div className="order__details">
                <h4 className="order__confirm">Order Confirmed</h4>
                <h4>Payment ID: {item.paymentId}</h4>
                <h4>Total Amount : ₹ {item.amount}</h4>
                <h4>Delivery Address : </h4>
                <h5> {item.delivery.name}</h5>
                <h5>{item.delivery.email}</h5>
                <h5>
                  {item.delivery.address}, {item.delivery.city}
                </h5>
                <h5>
                  {item.delivery.state}, {item.delivery.zipcode}
                </h5>
              </div>
              <div>
                {item.products.map((prod) => (
                  <Link to={`/product/${prod.id}`}>
                    <div className="order__outer">
                      <div className="order__image">
                        <img src={prod.image} />
                      </div>
                      <div className="order__info">
                        <h4>Name : {prod.name}</h4>
                        <h4>Category : {prod.category}</h4>
                        <h4>Quantity : {prod.qty}</h4>
                        <h4>Price : ₹ {prod.price}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
