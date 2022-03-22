import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../stylesheets/profile.css";

const navLinkStyle = ({ isActive }) => {
  return isActive ? `activetab` : `notactive`;
};

const Profile = () => {
  return (
    <div class="profile__section">
      <div class="profile__image">
        <NavLink className={navLinkStyle} to="info">
          My profile
        </NavLink>
        <NavLink className={navLinkStyle} to="address">
          Manage Address
        </NavLink>
        <NavLink className={navLinkStyle} to="orders">
          Order History
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
