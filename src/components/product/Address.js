import React from "react";
import { useAuth } from "../../context/authcontext";
import { useOrder } from "../../context/ordercontext";

const Address = () => {
  const { localUser } = useAuth();
  const { address, setAddress, orderdispatch, orderstate } = useOrder();

  return (
    <div className="manage__address">
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

      {orderstate.address.length > 0 && <h1>All Address</h1>}

      <div className="address__card--flex">
        {orderstate.address.map((item, index) => (
          <div className="address__card" key={index + 1}>
            <p>Name : {item.name}</p>
            <p>Email : {item.email}</p>
            <p>
              Address : {item.address}, {item.city}, Pin-code : {item.zipcode}
            </p>
            <p>State : {item.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
