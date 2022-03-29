import React from "react";
import { useAuth } from "../../context/authcontext";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";

const Profileinfo = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const { clearWishlist } = useWishlist();
  const { clearCart } = useCart();
  const { handleLogout } = useAuth();

  return (
    <div className="profile__info">
      <div className="profile__name">
        <h1>{userdata.name}</h1>
        <p>Full stack developer</p>
        <button
          className="large__screen-button"
          onClick={() => {
            handleLogout();
            clearWishlist();
            clearCart();
          }}
        >
          Logout <i className="fa-solid fa-door-open"></i>
        </button>
        <button className="small__screen-button">
          <i
            className="fa-solid fa-door-open"
            onClick={() => {
              handleLogout();
              clearWishlist();
              clearCart();
            }}
          ></i>
        </button>
      </div>
      <div className="profile__about">
        <h4>Name : </h4>
        <p>{userdata.name}</p>

        <h4>Email : </h4>
        <p>{userdata.email}</p>

        <h4>Mobile No : </h4>
        <p>+91 9933227766</p>

        <h4>Profession : </h4>
        <p>Full stack developer</p>
      </div>
    </div>
  );
};

export default Profileinfo;
