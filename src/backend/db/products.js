import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    name: "Nike Men Quest 4",
    description:
      "The Nike Quest wraps your foot in lightweight, breathable mesh, while Flywire cables give a secure fit. The soft yet responsive foam feels supportive underfoot as you quicken your pace. Flywire cables wrap your foot in lightweight support.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/sports_gaww5n.png",
    category: "sport",
    quantity: 1,
    price: 2999,
    sizes: {
      7: false,
      8: true,
      9: false,
      10: false,
      11: true,
    },
    ratings: [1, 2, 3, 4, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "Puma Brandon",
    description:
      "This pair of flip-flops from Puma is an apt pick this season. The vibrant colourblocked is sure to add more to your look. Team it with a tee and shorts for a laid-back appeal.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product15_mkoazv.png",
    category: "flip-flop",
    quantity: 1,
    price: 799,
    sizes: {
      7: false,
      8: false,
      9: false,
      10: true,
      11: true,
    },
    ratings: [1, 2, 3, 3, 2],
  },
  {
    _id: uuid(),
    name: "Provogue Lifestyle",
    description:
      "Spruce up your cool and trendy look wearing these navy blue coloured casual shoes from the house of Woodland. The nubuck leather upper of these casual shoes for men ensures high quality and lightweight feel.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product12_kvf059.png",
    category: "casual",
    quantity: 1,
    price: 2699,
    sizes: {
      7: true,
      8: false,
      9: false,
      10: true,
      11: true,
    },
    ratings: [5, 2, 3, 4, 3, 2],
  },
  {
    _id: uuid(),
    name: "Louis Philippe Rubber Sliders",
    description:
      "A pair of navy blue printed sliders, Rubber upper, Cushioned footbed, Patterned eva outsole",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product13_qseudv.png",
    category: "flip-flop",
    quantity: 1,
    price: 899,
    sizes: {
      7: false,
      8: true,
      9: false,
      10: false,
      11: true,
    },
    ratings: [5, 2, 3],
  },
  {
    _id: uuid(),
    name: "Carlton London Sliders",
    description:
      "A pair of white and blue printed sliders, Rubber upper, Cushioned footbed, Patterned rubber outsole, Warranty 1 month against manufacturing defect only, Warranty provided by the brand owner / manufacturer",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product16_pdbduh.png",
    category: "flip-flop",
    quantity: 1,
    price: 499,
    sizes: {
      7: false,
      8: true,
      9: true,
      10: false,
      11: true,
    },
    ratings: [5, 2, 3, 1, 1],
  },
  {
    _id: uuid(),
    name: "U.S. Polo Assn. Printed Thong",
    description:
      "This pair of flip-flops from U.S. Polo Assn. is an apt pick this season. The vibrant printed is sure to add more to your look. Team it with a tee and shorts for a laid-back appeal.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product14_swtzkg.png",
    category: "flip-flop",
    quantity: 1,
    price: 599,
    sizes: { 5: true, 6: true, 7: true, 8: true, 9: true, 10: false, 11: true },
    ratings: [5, 2, 3, 1, 1, 4],
  },
  {
    _id: uuid(),
    name: "El Paso Solid Formal Oxfords",
    description:
      "This pair of formal shoes from El Paso is a must-have in your footwear collection. We suggest you team it with any of your formal outfits for a classy look.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240010/shoemall/product10_ultdth.png",
    category: "formal",
    quantity: 1,
    price: 999,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: true,
    },
    ratings: [5, 2, 3, 4, 2, 5, 4, 3, 2],
  },
  {
    _id: uuid(),
    name: "red Shief Slipons",
    description:
      "Textured outsole with patterned grooves, hasnbsp;a stacked heel. This pair of slip-ons from Red Chief is classy and stylish. Team it with slim trousers and a crisp shirt for a suave look.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240009/shoemall/product11_vasjd3.png",
    category: "formal",
    quantity: 1,
    price: 4999,
    sizes: {
      7: true,
      8: true,
      9: true,
      10: false,
      11: true,
    },
    ratings: [5, 2, 3, 5, 4, 3, 2],
  },
  {
    _id: uuid(),
    name: "The Nike Rival 2",
    description:
      "Soft, plush material wraps your foot in comfort that complements the smooth, stable cushioning underfoot. Reduced collar height and traditional tongue construction make for snug, conforming comfort mile after mile.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240009/shoemall/product6_sw17wi.png",
    category: "casual",
    quantity: 1,
    price: 3999,
    sizes: { 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true },
    ratings: [5, 2, 3, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "HRX Sauve",
    description:
      "Keep up the sporty look even when you're off the courts with the HRX Men's Athleisure Shoes from the Sauve Collection. The knitted upper, cushioned insole and neutral support system work together to give you day long comfort.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240008/shoemall/product5_qexnfu.png",
    category: "casual",
    quantity: 1,
    price: 2299,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: true,
      11: true,
    },
    ratings: [4, 3, 5, 2, 3, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "Louis Stitch Boots",
    description:
      "Step out in style with this mens leather shoes from the house of LOUIS STITCH. A perfect blend of style and design this mens shoes is a must-have in your wardrobe.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240008/shoemall/product8_v4goz0.png",
    category: "casual",
    quantity: 1,
    price: 3299,
    sizes: { 5: true, 6: true, 7: true, 8: false, 9: true, 10: true, 11: true },
    ratings: [5, 5],
  },
  {
    _id: uuid(),
    name: "Red Tape Mesh",
    description:
      "A pair of black walking shoes, has regular Styling, lace-ups detail, Mesh upper, Cushioned footbed, Textured and patterned outsole",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240007/shoemall/product4_grqxzx.png",
    category: "casual",
    quantity: 1,
    price: 1299,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: false,
    },
    ratings: [4, 3, 5, 2, 4, 5, 3, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "Refoam Mesh Shoes",
    description:
      "With a snug fit and cushioned comfort the Refoam Shoes from the Core Sports Collection are ideal for a quick jog around the block as well as a casual Friday in the office.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240008/shoemall/product7_wxmbyb.png",
    category: "casual",
    quantity: 1,
    price: 2199,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: false,
    },
    ratings: [4, 3, 5, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "HRX Grey Core",
    description:
      "Designed to provide maximum support to your feet and ankle Breathable upper keeps your feet cool and dry Seamless lamination enhances durability Counter clutch helps maintain a strong grip while running High density midsole cushions impact.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/product3_jcfkwq.png",
    category: "sport",
    quantity: 1,
    price: 2199,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: false,
    },
    ratings: [4, 3, 5, 5, 3, 2],
  },
  {
    _id: uuid(),
    name: "Benetton Thong",
    description:
      "This pair of flip-flops from United Colors of Benetton is an apt pick this season. The vibrant solid is sure to add more to your look. Team it with a tee and shorts for a laid-back appeal.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/flipflop_qao6dx.png",
    category: "flip-flop",
    quantity: 1,
    price: 799,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: true,
    },
    ratings: [4, 3, 5, 4, 3, 5, 2],
  },
  {
    _id: uuid(),
    name: "Adidas Woven Lite",
    description:
      "This pair of flip-flops from United Colors of Benetton is an apt pick this season. The vibrant solid is sure to add more to your look. Team it with a tee and shorts for a laid-back appeal.",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/demo1_nsbngx.png",
    category: "sport",
    quantity: 1,
    price: 2999,
    sizes: {
      7: true,
      8: false,
      9: true,
      10: false,
      11: true,
    },
    ratings: [5, 5, 5],
  },
  {
    _id: uuid(),
    name: "Camel Brown shoe",
    description:
      "A pair of round-toe camel brown sneakers, has regular styling, lace-up Nubuck upper Cushioned footbed Arch flex Textured and patterned outsole",
    image:
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1647240006/shoemall/demo2_rqust3.png",
    category: "casual",
    quantity: 1,
    price: 1899,
    sizes: { 7: true, 8: false, 9: true, 10: true, 11: true },
    ratings: [5, 4, 3, 5, 2, 4, 3, 2, 4, 1],
  },
];
