import React from "react";
import { Loader } from "frontend/components";
import { useWishlist } from "frontend/context";
import { WishlistCard } from "frontend/pages";

const Wishlist = () => {
  const { state } = useWishlist();

  return (
    <>
      <div className="wishlist">
        <div className="wishlist__heading">
          <i className="fas fa-heart"></i>
          <h1>My Wishlist ({state.wishlist.length})</h1>
        </div>
        {state.loading && <Loader />}
        {!state.wishlist.length && (
          <div className="empty__message">
            <h1>Your wishlist is empty !</h1>
          </div>
        )}

        <div className="product__list-grid wishlist__grid">
          {state.wishlist.map((item) => (
            <WishlistCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Wishlist };
