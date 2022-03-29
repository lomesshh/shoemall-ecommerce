import React, { useState } from "react";
import "../stylesheets/products.css";
import ProductCard from "./ProductCard";
import { useFilter } from "../../context/filtercontext";
import Pagination from "../pages/Pagination";

const ProductList = () => {
  const [showfilter, setShowfilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const { sortedData, dispatch, state } = useFilter();
  const [currPage, setCurrPage] = useState(1);
  const [postPerPage] = useState(6);

  const lastPostIndex = currPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currPost = sortedData.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <div>
      <div className="short__filter">
        <div className="short__filter-button">
          <button onClick={() => setShowfilter(() => !showfilter)}>
            <i className="fa-solid fa-filter"></i> Apply Filter
          </button>
        </div>

        {showfilter && (
          <div className="short__filter-filterlist">
            <button onClick={() => dispatch({ type: "CLEAR_FILTER" })}>
              Clear all filters
            </button>
            <div className="filters product__filter-sort">
              <h2>Sort by</h2>
              <h4>
                <input
                  type="radio"
                  name="sort1"
                  checked={state.sortHighToLow}
                  onClick={() =>
                    dispatch({ type: "SORT", payload: "HIGH_LOW" })
                  }
                />{" "}
                High to Low
              </h4>
              <h4>
                <input
                  type="radio"
                  name="sort1"
                  checked={state.sortLowToHigh}
                  onClick={() =>
                    dispatch({ type: "SORT", payload: "LOW_HIGH" })
                  }
                />{" "}
                Low to High
              </h4>
            </div>
            <div className="filters product__filter-price">
              <h2>Price</h2>
              <input
                type="range"
                value={state.priceValue}
                min="0"
                max="5000"
                onChange={(e) =>
                  dispatch({ type: "PRICE", costValue: e.target.value })
                }
              />
              <h3> Under ₹{state.priceValue}</h3>
            </div>

            <div className="filters product__filter-category">
              <h2>Category</h2>
              <h4>
                <input
                  type="checkbox"
                  checked={state.categoryArr.includes("CASUAL_SHOE")}
                  onClick={() =>
                    dispatch({ type: "CATEGORY", shoetype: "CASUAL_SHOE" })
                  }
                />{" "}
                Casual shoe
              </h4>
              <h4>
                <input
                  type="checkbox"
                  checked={state.categoryArr.includes("SPORTS_SHOE")}
                  onClick={() =>
                    dispatch({ type: "CATEGORY", shoetype: "SPORTS_SHOE" })
                  }
                />{" "}
                Sports shoe
              </h4>
              <h4>
                <input
                  type="checkbox"
                  checked={state.categoryArr.includes("FORMAL_SHOE")}
                  onClick={() =>
                    dispatch({ type: "CATEGORY", shoetype: "FORMAL_SHOE" })
                  }
                />{" "}
                Formal shoe
              </h4>
              <h4>
                <input
                  type="checkbox"
                  checked={state.categoryArr.includes("FLIP_FLOP")}
                  onClick={() =>
                    dispatch({ type: "CATEGORY", shoetype: "FLIP_FLOP" })
                  }
                />{" "}
                Flip flop
              </h4>
            </div>

            <div className="filters product__filter-rating">
              <h2>Rating</h2>
              <h4>
                <input
                  type="radio"
                  name="rating1"
                  checked={state.fiveStar}
                  onClick={() => dispatch({ type: "RATING", star: "STAR_5" })}
                />{" "}
                5 Stars
              </h4>
              <h4>
                <input
                  type="radio"
                  name="rating1"
                  checked={state.fourStar}
                  onClick={() => dispatch({ type: "RATING", star: "STAR_4" })}
                />{" "}
                4 Stars & above
              </h4>
              <h4>
                <input
                  type="radio"
                  name="rating1"
                  checked={state.threeStar}
                  onClick={() => dispatch({ type: "RATING", star: "STAR_3" })}
                />{" "}
                3 Stars & above
              </h4>
              <h4>
                <input
                  type="radio"
                  name="rating1"
                  checked={state.twoStar}
                  onClick={() => dispatch({ type: "RATING", star: "STAR_2" })}
                />{" "}
                2 Stars & above
              </h4>
            </div>
          </div>
        )}
      </div>

      <div className="product">
        <div className="product__filter">
          <div className="product__filter-heading">
            <h1>Filters</h1>
            <button onClick={() => dispatch({ type: "CLEAR_FILTER" })}>
              Clear
            </button>
          </div>

          <div className="filters product__filter-sort">
            <h2>Sort by</h2>
            <h4>
              <input
                type="radio"
                name="sort"
                checked={state.sortHighToLow}
                onClick={() => dispatch({ type: "SORT", payload: "HIGH_LOW" })}
              />{" "}
              High to Low
            </h4>
            <h4>
              <input
                type="radio"
                name="sort"
                checked={state.sortLowToHigh}
                onClick={() => dispatch({ type: "SORT", payload: "LOW_HIGH" })}
              />{" "}
              Low to High
            </h4>
          </div>

          <div className="filters product__filter-price">
            <h2>Price</h2>
            <input
              type="range"
              value={state.priceValue}
              min="0"
              max="5000"
              onChange={(e) =>
                dispatch({ type: "PRICE", costValue: e.target.value })
              }
            />
            <h3> Under ₹{state.priceValue}</h3>
          </div>

          <div className="filters product__filter-category">
            <h2>Category</h2>
            <h4>
              <input
                type="checkbox"
                checked={state.categoryArr.includes("CASUAL_SHOE")}
                onClick={() =>
                  dispatch({ type: "CATEGORY", shoetype: "CASUAL_SHOE" })
                }
              />{" "}
              Casual shoe
            </h4>
            <h4>
              <input
                type="checkbox"
                checked={state.categoryArr.includes("SPORTS_SHOE")}
                onClick={() =>
                  dispatch({ type: "CATEGORY", shoetype: "SPORTS_SHOE" })
                }
              />{" "}
              Sports shoe
            </h4>
            <h4>
              <input
                type="checkbox"
                checked={state.categoryArr.includes("FORMAL_SHOE")}
                onClick={() =>
                  dispatch({ type: "CATEGORY", shoetype: "FORMAL_SHOE" })
                }
              />{" "}
              Formal shoe
            </h4>
            <h4>
              <input
                type="checkbox"
                checked={state.categoryArr.includes("FLIP_FLOP")}
                onClick={() =>
                  dispatch({ type: "CATEGORY", shoetype: "FLIP_FLOP" })
                }
              />{" "}
              Flip flop
            </h4>
          </div>

          <div className="filters product__filter-rating">
            <h2>Rating</h2>
            <h4>
              <input
                type="radio"
                name="rating"
                checked={state.fiveStar}
                onClick={() => dispatch({ type: "RATING", star: "STAR_5" })}
              />{" "}
              5 Stars
            </h4>
            <h4>
              <input
                type="radio"
                name="rating"
                checked={state.fourStar}
                onClick={() => dispatch({ type: "RATING", star: "STAR_4" })}
              />{" "}
              4 Stars & above
            </h4>
            <h4>
              <input
                type="radio"
                name="rating"
                checked={state.threeStar}
                onClick={() => dispatch({ type: "RATING", star: "STAR_3" })}
              />{" "}
              3 Stars & above
            </h4>
            <h4>
              <input
                type="radio"
                name="rating"
                checked={state.twoStar}
                onClick={() => dispatch({ type: "RATING", star: "STAR_2" })}
              />{" "}
              2 Stars & above
            </h4>
          </div>
        </div>

        <div className="product__list">
          <div className="product__list-search">
            <input
              type="text"
              placeholder="Search here"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <div className="main__product-list product__list-grid">
            {currPost
              .filter((product) => {
                if (searchFilter === "") {
                  return product;
                } else if (
                  product.name
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((item, index) => (
                <ProductCard item={item} key={index + 1} />
              ))}
          </div>
          <Pagination
            postPerPage={postPerPage}
            totalPosts={sortedData.length}
            paginate={paginate}
            currPage={currPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
