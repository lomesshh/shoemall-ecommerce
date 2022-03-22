import React from "react";
import { useAuth } from "../../context/authcontext";

const Profileinfo = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));

  const { handleLogout } = useAuth();

  return (
    <div class="profile__info">
      <div class="profile__name">
        <h1>{userdata.name}</h1>
        <p>Full stack developer</p>
        <button class="large__screen-button" onClick={handleLogout}>
          Logout <i class="fa-solid fa-door-open"></i>
        </button>
        <button class="small__screen-button">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
      <div class="profile__about">
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
