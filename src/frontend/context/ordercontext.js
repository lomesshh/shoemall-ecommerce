import React, { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

const OrderContext = createContext();

const initialValue = {
  address: [
    {
      id: uuid(),
      address: "31/B Wing, Mohan Pride",
      city: "Bandra, mumbai",
      email: "testuser@gmail.com",
      name: "test user",
      state: "Maharashtra",
      zipcode: "548211",
    },
    {
      id: uuid(),
      address: "Parvatara Apt 1101/A",
      city: "wakad, pune",
      email: "testuser@gmail.com",
      name: "test user",
      state: "Maharashtra",
      zipcode: "421301",
    },
  ],
  deliveryAddress: {},
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, address: [...state.address, action.payload] };
    case "REMOVE_ADDRESS":
      const { address } = action.payload;
      const currIndex = state.address.indexOf(address);
      return {
        ...state,
        address: [
          ...state.address.slice(0, currIndex),
          ...state.address.slice(currIndex + 1),
        ],
      };
    case "DELIVERY_ADDRESS":
      return { ...state, deliveryAddress: { ...action.payload } };
    case "ADD_ORDERS":
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
};

const OrderProvider = ({ children }) => {
  const [orderstate, orderdispatch] = useReducer(reducer, initialValue);

  const [address, setAddress] = useState({
    id: uuid(),
    email: "",
    name: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
  });

  return (
    <div>
      <OrderContext.Provider
        value={{ address, setAddress, orderdispatch, orderstate }}
      >
        {children}
      </OrderContext.Provider>
    </div>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
