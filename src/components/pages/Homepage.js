import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero__left">
          <div className="hero__info">
            <h1>ARE YOU READY TO</h1>
            <h1>LEAD THE WAY</h1>
            <p>
              You can't buy happiness, but you can buy shoes, and that's kind of
              the same thing. we have a wide range of different categories of
              shoe.
            </p>
            <div className="hero__info-button">
              <Link to="/productslist">
                <button>Explore</button>
              </Link>
              <a href="#category">View Categories</a>
            </div>
          </div>
        </div>
        <div className="hero__right">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#392F5A"
              d="M28.6,-54.3C38.9,-43.6,50.4,-39.7,56.3,-31.7C62.3,-23.8,62.8,-11.9,60.2,-1.5C57.7,8.9,52,17.9,46.8,27C41.5,36.2,36.6,45.5,28.9,50.4C21.1,55.2,10.6,55.5,-1.7,58.5C-14,61.5,-28.1,67.3,-39.3,64.4C-50.5,61.6,-58.8,50.2,-58.8,38C-58.8,25.9,-50.3,12.9,-45.7,2.6C-41.1,-7.6,-40.4,-15.3,-39.3,-25.4C-38.2,-35.5,-36.6,-48.2,-30,-60.9C-23.4,-73.7,-11.7,-86.6,-1.3,-84.4C9.2,-82.2,18.3,-64.9,28.6,-54.3Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240007/shoemall/hero-img_vwcxnx.png"
            alt="hero-img"
          />
        </div>
      </div>

      <div className="banner">
        <img
          src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647501490/shoemall/offer2_olw8zx.jpg"
          alt="banner-img"
        />
      </div>

      <div id="category" className="category">
        <div className="category__title">
          <h1>Categories</h1>
        </div>
        <div className="category__heading">
          <div className="category__card category__card-one">
            <h1>Casual </h1>
            <Link to="/productslist">
              <img
                src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/casual_dmjpy7.png"
                alt="category-img"
              />
            </Link>
          </div>
          <div className="category__card category__card-two">
            <h1>Sports </h1>
            <Link to="/productslist">
              <img
                src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/sports_gaww5n.png"
                alt="category-img"
              />
            </Link>
          </div>
          <div className="category__card category__card-three">
            <h1>Formal </h1>
            <Link to="/productslist">
              <img
                src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/formal_cbbtmd.png"
                alt="category-img"
              />
            </Link>
          </div>
          <div className="category__card category__card-four">
            <h1>Flip flops</h1>
            <Link to="/productslist">
              <img
                src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/flipflop_qao6dx.png"
                alt="category-img"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="banner">
        <img
          src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647501490/shoemall/offer3_a5achi.jpg"
          alt="banner-img"
        />
      </div>
    </div>
  );
};

export default Homepage;
