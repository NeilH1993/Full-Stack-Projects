import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      name: "Banana",
      price: 5,
      type: "fruit",
    },
    {
      name: "Cucumber",
      price: 3,
      type: "vegetable",
    },
    {
      name: "Tomato",
      price: 2,
      type: "vegetable",
    },
    {
      name: "Carrot",
      price: 3,
      type: "vegetable",
    },
    {
      name: "Orange",
      price: 2.5,
      type: "fruit",
    },
  ]);

  return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
}
