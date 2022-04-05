import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";

const filterContext = createContext();

const FilterProvider = ({ children }) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/products");
        setAllProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [flag]);

  const initialValue = {
    sortby: null,
    ratingStar: null,
    categoryArr: [],
    priceValue: 5000,
    sortHighToLow: false,
    sortLowToHigh: false,
    fiveStar: false,
    fourStar: false,
    threeStar: false,
    twoStar: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SORT":
        return { ...state, sortby: action.payload };
      case "PRICE":
        return { ...state, priceValue: action.costValue };
      case "RATING":
        return { ...state, ratingStar: action.star };
      case "CATEGORY":
        const currIndex = state.categoryArr.indexOf(action.shoetype);
        if (currIndex === -1) {
          return {
            ...state,
            categoryArr: [...state.categoryArr, action.shoetype],
          };
        } else {
          return {
            ...state,
            categoryArr: [
              ...state.categoryArr.slice(0, currIndex),
              ...state.categoryArr.slice(currIndex + 1),
            ],
          };
        }
      case "CLEAR_FILTER":
        return {
          ...state,
          sortby: null,
          ratingStar: null,
          categoryArr: [],
          priceValue: 5000,
          sortHighToLow: false,
          sortLowToHigh: false,
          fiveStar: false,
          fourStar: false,
          threeStar: false,
          twoStar: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  const [allproducts, setAllProducts] = useState([]);

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const union = (...arr) => {
    const uni = arr.reduce((acc, curr) => {
      return acc.concat(
        curr.filter((el) => !acc.some((ele) => ele._id === el._id))
      );
    }, []);
    return uni;
  };

  const getDataSorted = (data, sortby) => {
    if (sortby === "LOW_HIGH") {
      state.sortLowToHigh = true;
      state.sortHighToLow = false;
      return data.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortby === "HIGH_LOW") {
      state.sortLowToHigh = false;
      state.sortHighToLow = true;
      return data.sort((a, b) => b["price"] - a["price"]);
    }
    return data;
  };

  const getFilteredData = (ratingData, priceValue, categoryArr) => {
    let newData = ratingData.filter(({ price }) => {
      return price < Number(priceValue);
    });
    let unifiedData = [];
    let flag = false;
    unifiedData = newData.filter(({ category }) => {
      if (categoryArr.includes("CASUAL_SHOE")) {
        flag = true;
        return category === "casual";
      }
      return false;
    });
    unifiedData = union(
      unifiedData,
      newData.filter(({ category }) => {
        if (categoryArr.includes("SPORTS_SHOE")) {
          flag = true;
          return category === "sport";
        }
        return false;
      })
    );
    unifiedData = union(
      unifiedData,
      newData.filter(({ category }) => {
        if (categoryArr.includes("FORMAL_SHOE")) {
          flag = true;
          return category === "formal";
        }
        return false;
      })
    );

    unifiedData = union(
      unifiedData,
      newData.filter(({ category }) => {
        if (categoryArr.includes("FLIP_FLOP")) {
          flag = true;
          return category === "flip-flop";
        }
        return false;
      })
    );
    if (flag) newData = unifiedData;
    return newData;
  };

  const getRatingDate = (data, star) => {
    if (star === "STAR_5") {
      state.fiveStar = true;
      state.fourStar = false;
      state.threeStar = false;
      state.twoStar = false;
      return data.filter(({ ratings }) => {
        return average(ratings).toFixed(0) > 4;
      });
    }
    if (star === "STAR_4") {
      state.fiveStar = false;
      state.fourStar = true;
      state.threeStar = false;
      state.twoStar = false;
      return data.filter(({ ratings }) => {
        return average(ratings).toFixed(0) > 3;
      });
    }
    if (star === "STAR_3") {
      state.fiveStar = false;
      state.fourStar = false;
      state.threeStar = true;
      state.twoStar = false;
      return data.filter(({ ratings }) => {
        return average(ratings).toFixed(0) > 2;
      });
    }
    if (star === "STAR_2") {
      state.fiveStar = false;
      state.fourStar = false;
      state.threeStar = false;
      state.twoStar = true;
      return data.filter(({ ratings }) => {
        return average(ratings).toFixed(0) > 1;
      });
    }
    return data;
  };

  const filteredData = getFilteredData(
    allproducts,
    state.priceValue,
    state.categoryArr
  );

  const ratingData = getRatingDate(filteredData, state.ratingStar);
  const sortedData = getDataSorted(ratingData, state.sortby);

  return (
    <div>
      <filterContext.Provider
        value={{ sortedData, state, dispatch, allproducts, setFlag, flag }}
      >
        {children}
      </filterContext.Provider>
    </div>
  );
};

const useFilter = () => useContext(filterContext);

export { FilterProvider, useFilter };
