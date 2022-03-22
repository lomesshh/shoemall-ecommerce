import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../stylesheets/profile.css";

const navLinkStyle = ({ isActive }) => {
  return {
    borderBottom: isActive ? "#392F5A solid 3px" : "",
  };
};

const Profile = () => {
  return (
    <div class="profile__section">
      <div class="profile__image">
        <NavLink style={navLinkStyle} to="info">
          My profile
        </NavLink>
        <NavLink style={navLinkStyle} to="address">
          Manage Address
        </NavLink>
        <NavLink style={navLinkStyle} to="orders">
          Order History
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
