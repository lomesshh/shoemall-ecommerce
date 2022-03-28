import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./authcontext";

const OrderContext = createContext();

const initialValue = {
  address: [
    {
      address: "31/B Wing, Mohan Pride",
      city: "Bandra, mumbai",
      email: "badhelomesh82@gmail.com",
      name: "Lomesh Badhe",
      state: "Maharashtra",
      zipcode: "548211",
    },
    {
      address: "Parvatara Apt 1101/A",
      city: "wakad, pune",
      email: "badhelomesh82@gmail.com",
      name: "Lomesh Badhe",
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
  const { localUser } = useAuth();

  const [address, setAddress] = useState({
    email: localUser.email,
    name: localUser.name,
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
