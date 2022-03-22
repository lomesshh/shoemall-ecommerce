import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { useCart } from "../../context/cartcontext";
import { useWishlist } from "../../context/wishlistcontext";
import "../stylesheets/index.css";

const Nav = () => {
  const { state } = useWishlist();

  const { cartstate } = useCart();

  const { token, localToken, handleLogout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav class="nav">
      <Link to="/">
        <div>
          <img
            class="nav__logo"
            src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/logo_rhszkc.png"
            alt="logo-img"
          />
        </div>
      </Link>
      <div class="nav__option">
        <ul>
          {token && (
            <li>
              <Link to="/">
                <button class="nav__option-login" onClick={handleLogout}>
                  <i class="fas fa-door-open"></i> Logout
                </button>
              </Link>
            </li>
          )}

          {!token && (
            <li>
              <Link to="/login">
                <button class="nav__option-login">
                  <i class="fas fa-sign-in-alt"></i> Login
                </button>
              </Link>
            </li>
          )}
          <li
            onClick={() =>
              localToken ? navigate("/wishlist") : navigate("/login")
            }
          >
            <p>
              <i class="fas fa-heart"></i>
              <span>{state.wishlist.length}</span>
            </p>
          </li>
          <li>
            <Link to={`${localToken ? `cart` : `login`}`}>
              <p>
                <i class="fas fa-shopping-cart"></i>
                <span>{cartstate.cart.length}</span>
              </p>
            </Link>
          </li>
          <li>
            <Link to={`${localToken ? `profile/info` : `login`}`}>
              <p>
                <i class="fa-solid fa-user"></i>
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
