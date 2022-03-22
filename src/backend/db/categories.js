import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    category: "casual",
  },
  {
    _id: uuid(),
    category: "sport",
  },
  {
    _id: uuid(),
    category: "formal",
  },
  {
    _id: uuid(),
    category: "flip-flop",
  },
];
